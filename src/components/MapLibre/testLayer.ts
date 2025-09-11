import type { CustomLayerInterface, Map as MapType } from "maplibre-gl";
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
): CustomLayerInterface => {
	let camera: THREE.Camera | undefined;
	let scene: THREE.Scene | undefined;
	let mapInstance: MapType;
	let renderer: THREE.WebGLRenderer;
	let loadedModel: GLTF;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const getCustomLayer: CustomLayerInterface = {
		id: "3d-model",
		type: "custom",
		renderingMode: "3d",
		onAdd: (map: MapType, gl: WebGL2RenderingContext) => {
			camera = new THREE.Camera();
			scene = new THREE.Scene();

			// create two three.js lights to illuminate the model
			const directionalLight = new THREE.DirectionalLight(0xffffff);
			directionalLight.position.set(0, -70, 100).normalize();
			scene.add(directionalLight);

			const directionalLight2 = new THREE.DirectionalLight(0xffffff);
			directionalLight2.position.set(0, 70, 100).normalize();
			scene.add(directionalLight2);

			// use the three.js GLTF loader to add the 3D model to the three.js scene
			const loader = new GLTFLoader();
			loader.load(
				"assets/3D/helicopter.glb",
				//"https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
				(gltf: GLTF) => {
					loadedModel = gltf;
					scene?.add(gltf.scene);
					scene?.scale.set(10, 10, 10);
				},
			);
			mapInstance = map;

			// use the Mapbox GL JS map canvas for three.js
			renderer = new THREE.WebGLRenderer({
				canvas: map.getCanvas(),
				context: gl,
				antialias: true,
			});

			renderer.autoClear = false;
		},
		render: (_gl, matrix) => {
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

			if (loadedModel?.scene) {
				loadedModel.scene.position.x -= 0.01;
			}

			if (camera && scene) {
				camera.projectionMatrix = m.multiply(l);
				renderer.resetState();
				renderer.render(scene, camera);
				mapInstance.triggerRepaint();
			}
		},
	};

	return getCustomLayer;
};
