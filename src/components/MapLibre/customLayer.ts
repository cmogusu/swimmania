import { type CustomLayerInterface, type Map as MapType } from "maplibre-gl";
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";

type ModelTransform = {
	translateX: number;
	translateY: number;
	translateZ: number;
	rotateX: number;
	rotateY: number;
	rotateZ: number;
	scale: number;
};

/**
 * Gets the configuration of the custom layer for a 3D model per the CustomLayerInterface
 */
export const getCustomLayer = (
	modelTransform: ModelTransform,
): CustomLayerInterface & {
	camera: THREE.Camera | undefined;
	scene: THREE.Scene | undefined;
	map: MapType;
	renderer: THREE.WebGLRenderer;
	loadedModel: GLTF;
} => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const getCustomLayer: CustomLayerInterface & {
		camera: THREE.Camera | undefined;
		scene: THREE.Scene | undefined;
		map: MapType;
		renderer: THREE.WebGLRenderer;
		loadedModel: GLTF;
	} = {
		id: "3d-model",
		type: "custom",
		renderingMode: "3d",
		camera: undefined,
		scene: undefined,
		onAdd: function (map: MapType, gl: WebGL2RenderingContext) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const self = this;
			this.camera = new THREE.Camera();
			this.scene = new THREE.Scene();

			// create two three.js lights to illuminate the model
			const directionalLight = new THREE.DirectionalLight(0xffffff);
			directionalLight.position.set(0, -70, 100).normalize();
			this.scene.add(directionalLight);

			const directionalLight2 = new THREE.DirectionalLight(0xffffff);
			directionalLight2.position.set(0, 70, 100).normalize();
			this.scene.add(directionalLight2);

			// use the three.js GLTF loader to add the 3D model to the three.js scene
			const loader = new GLTFLoader();
			loader.load(
				"assets/3D/helicopter.glb",
				//"https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
				function (gltf: GLTF) {
					self.loadedModel = gltf;
					self.scene?.add(gltf.scene);
					self.scene?.scale.set(10, 10, 10);
				}.bind(this),
			);
			this.map = map;

			// use the Mapbox GL JS map canvas for three.js
			this.renderer = new THREE.WebGLRenderer({
				canvas: map.getCanvas(),
				context: gl,
				antialias: true,
			});

			this.renderer.autoClear = false;
		},
		render: function (_gl, matrix) {
			const rotationX = new THREE.Matrix4().makeRotationAxis(
				new THREE.Vector3(1, 0, 0),
				modelTransform.rotateX,
			);
			const rotationY = new THREE.Matrix4().makeRotationAxis(
				new THREE.Vector3(0, 1, 0),
				modelTransform.rotateY,
			);
			const rotationZ = new THREE.Matrix4().makeRotationAxis(
				new THREE.Vector3(0, 0, 1),
				modelTransform.rotateZ,
			);

			const m = new THREE.Matrix4().fromArray(
				Object.values(matrix.defaultProjectionData.mainMatrix),
			);
			const l = new THREE.Matrix4()
				.makeTranslation(
					modelTransform.translateX,
					modelTransform.translateY,
					modelTransform.translateZ,
				)
				.scale(
					new THREE.Vector3(
						modelTransform.scale,
						-modelTransform.scale,
						modelTransform.scale,
					),
				)
				.multiply(rotationX)
				.multiply(rotationY)
				.multiply(rotationZ);

			this.loadedModel.scene.position.x -= 0.01;
			if (this.camera && this.scene) {
				this.camera.projectionMatrix = m.multiply(l);
				this.renderer.resetState();
				this.renderer.render(this.scene, this.camera);
				this.map.triggerRepaint();
			}
		},
	};

	return getCustomLayer;
};
