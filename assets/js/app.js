import '../css/app.css';
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembersListPage from './pages/MembersListPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilPage from './pages/ProfilPage';
import MemberPage from './pages/MemberPage';
import { ToastContainer, toast } from 'react-toastify';
import AuthApi from "./services/AuthApi";
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { Scene, WebGLRenderer, PerspectiveCamera, BufferGeometry, Points, PointsMaterial, Float32BufferAttribute, MathUtils, TextureLoader, Group, Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* Animation 3D avec Three.js */

const textureLoader = new TextureLoader();

// test pour avoir trois symboles differents
const textures = ["/note.png","/note1.png","/note2.png"];
const randomTexture = textures[Math.floor(Math.random() * textures.length)];

for (let a = 0; a < textures.length; a++) {
    var noteTexture = textureLoader.load(textures[Math.floor(Math.random() * textures.length)]);
}

// fin test

const scene = new Scene();
const count = 100;
const distance = 2;

//scene.add(new AxesHelper());

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.z = 2;
camera.position.x = 0.5;
camera.position.y = 0.5;

scene.add(camera);

const points = new Float32Array(count * 3);

for (let i = 0; i < points.length; i++) {
    points[i] = MathUtils.randFloatSpread(distance * 2);
    points[i + 1] = MathUtils.randFloatSpread(distance * 2);
    points[i + 2] = MathUtils.randFloatSpread(distance * 2);
}

const geometry = new BufferGeometry();

geometry.setAttribute("position", new Float32BufferAttribute(points, 3));



const pointsMaterial = new PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    alphaTest: 0.01,
    transparent: true,
    map: noteTexture
})
const pointsObject = new Points(geometry, pointsMaterial);
const group = new Group();
group.add(pointsObject);

scene.add(group);

const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new Clock();

// pour que l'animation suive la souris mais ça bug
let mouseX = 0;
window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
})



function tick () {
    const time = clock.getElapsedTime();
    //group.rotation.y = time * 0.1;

    //pour que l'animation suive la souri 
    const ratio = (mouseX / window.innerWidth - 0.5) * 2;
    group.rotation.y = ratio * Math.PI * 0.1;
    group.rotation.x = ratio * Math.PI * 0.1;
    group.rotation.z = ratio * Math.PI * 0.1;
    group.rotateY(0.001 * Math.PI);
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(tick);
}

tick();
window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/* fin animation 3D */

//Permet de savoir si on est authentifié au démarrage de l'appli.
AuthApi.setup();

const App = () => {
  
    // Il faudrait par defaut qu'on demande a Authapi si on est connecté ou pas.
    
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthApi.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(Navbar);


    return (
        /* Le HashRouter me permet de dire qu'on reste sur la meme page mais avec un element different  #/styles ou #/users, etc...*/
        /*  C'est le switch qui joue le rôle du router */
        
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
        
       
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login"  component= { LoginPage }/>
                        <Route path="/register"  component= { RegisterPage }/>
                        <PrivateRoute path="/member" component = { MemberPage }/>
                        <Route path="/users/:id" component={ProfilPage} />
                        <Route path="/membersList" component={MembersListPage} />
                         <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
           
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            </AuthContext.Provider>
    );
    
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);

