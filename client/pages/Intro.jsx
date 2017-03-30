// Three.js stuff
var skullObj = require('vendor/models/skull3.json');
var uziObj = require('vendor/models/uzi.obj');
var groundTexture = require('vendor/textures/texture.jpg');
var gratataSound = require('vendor/sounds/gratata.ogg');
require("vendor/js/SplitText.min.js");
require("vendor/js/OBJLoader.js");
require("vendor/js/EffectComposer.js");
require("vendor/js/RenderPass.js");
require("vendor/js/ShaderPass.js");
require("vendor/js/GlitchPass.js");
require("vendor/js/CopyShader.js");
require("vendor/js/DigitalGlitch.js");
var Detector = require("vendor/js/Detector.js");

// React suff
import React, { Component } from 'react';

export default React.createClass({

  componentDidMount() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    const self = this;
    var container;
    var uzis = [];
    var sound;
    var camera, controls, scene, renderer, composer;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var texture;
    var skull;
    var skullComponents = [];
    var wireframe;
    var wireframeComponents = [];
    var skullAnimation;
    var rendered = false;
    var allSet = false;
    var locked = false;
    var centered = false;
    var ended = false;

    function isSafari() {
      return navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    }

    window.onkeyup = function(e) {
      if (!allSet) {
        return;
      }
      var key = e.keyCode ? e.keyCode : e.which;
      if (key == 13 || key == 32) {
        allSet = false
        enterTheMatrix()
      } else {
        e.preventDefault();
      }
    }

    function animateWarning() {
      var split = new SplitText(".alert", {
        type: "words",
        wordDelimiter: "*"
      });
      TweenMax.staggerFrom(split.words, 1, {
        opacity: 0,
        y: 50,
        delay: 5,
        ease: Back.easeIn.config(8),
        onComplete: function() {
          allSet = true
          TweenMax.staggerTo(".blink",1,{
            opacity:1,
            ease:SteppedEase.config(1),
            repeat:-1,
            repeatDelay:0.1,
          },0.5);
          if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            document.getElementById("container").addEventListener("click", function(){
              enterTheMatrix();
            });
          }
        }
      }, 0.1);
    }

    function enterTheMatrix() {
      locked = true;
      var split = new SplitText(".alert", {
        type: "words",
        wordDelimiter: "*"
      });
      TweenMax.staggerTo(split.words, 1, {
        opacity: 0,
        delay: 0,
        ease: Back.easeIn.config(8),
        onComplete: function() {
          TweenMax.to(".blink",1,{
            opacity:0,
            ease:Back.easeIn.config(8),
            onComplete: function() {
              enterTheSkull()
            }
          },0.5);
        }
      }, 0.05);
    }

    function enterTheSkull() {
      // skullAnimation.stop();
      var current	= { y: camera.position.y, x: camera.position.x, lol: skull.position.y, z: camera.position.z };

      var tweenCenter = new TWEEN.Tween(current).to({x: 0, y: 0}, 1000);
      var tweenSkullTop = new TWEEN.Tween(current).to({lol: 300}, 1000);
      var tweenZoom = new TWEEN.Tween(current).to({z: -1500}, 1000);

      tweenCenter.onUpdate(function(){
        camera.position.x = current.x;
        camera.position.y = current.y;
      });

      tweenCenter.onComplete(function() {centered = true});

      tweenSkullTop.onUpdate(function(){
        skull.position.y = current.lol;
        wireframe.position.y = current.lol;
      });
      //
      tweenZoom.onUpdate(function(){
        camera.position.z = current.z;
      });

      tweenZoom.onComplete(function() {
        TweenMax.to("#container",0.5,{
          opacity:0,
          ease:Back.easeIn.config(8),
          onComplete: function() {
            ended = true;
            if (!isSafari()) {
              sound.stop();
            }
            self.props.router.push('welcome');
          }
        });
      })

      tweenCenter.easing(TWEEN.Easing.Quadratic.InOut)
      tweenSkullTop.easing(TWEEN.Easing.Quadratic.InOut)
      tweenZoom.easing(TWEEN.Easing.Quadratic.InOut)
      tweenCenter.chain(tweenSkullTop);
      tweenSkullTop.chain(tweenZoom)
      tweenCenter.start();
    }

    animateWarning();
    init();
    animate();
    function init() {
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
      var listener = new THREE.AudioListener();
      camera.add( listener );
      camera.position.z = 3000;
      camera.position.x = 0;
      camera.position.y = 0;
      zoomIn()

      function zoomIn() {
        var current	= { z: camera.position.z, x: camera.position.x };

        var tweenZoom = new TWEEN.Tween(current).to({z: 120, x: 60}, 6000)

        tweenZoom.onUpdate(function(){
          camera.position.z = current.z;
          camera.position.x = current.x;
        });

        tweenZoom.easing(TWEEN.Easing.Quadratic.InOut)
        tweenZoom.start();
      }

      // manager
      var manager = new THREE.LoadingManager();
      manager.onProgress = function ( item, loaded, total ) {
        if (loaded === total) {
          rendered = true;
        }
      };

      var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          // console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
      };
      var onError = function ( xhr ) {
      };

      // Skulls
      var loaderSkull = new THREE.ObjectLoader(manager);

      loaderSkull.load(skullObj, function(geometry) {
        var material = new THREE.MeshBasicMaterial( {
          color: 0x000000,
        });
        geometry.rotateY(Math.PI)
        geometry.rotateZ(Math.PI)
        geometry.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
          skullComponents.push(child)
        });
        geometry.castShadow = true;
        skull = geometry;
        if (!isSafari()) {
          var audioLoader = new THREE.AudioLoader();
          sound = new THREE.PositionalAudio( listener );
          audioLoader.load(gratataSound, function( buffer ) {
            sound.setBuffer( buffer );
            sound.setRefDistance( 100 );
            sound.setLoop(true);
            sound.setPlaybackRate(0.9)
            sound.play();
          });
          skull.add( sound );
        }

        scene.add( skull );
        loadWireframe()
      }, onProgress, onError)

      var loader = new THREE.OBJLoader();

      function positionX() {
        var random = Math.floor(Math.random()*(300-(-300)+1)+(-300));
        if (random >= 0) {
          random = random + 40;
        } else {
          random = random - 40;
        }

        return random;
      }

      loader.load( uziObj, function( geometry ){
        var newGeo = geometry.children[0].geometry;
        for (var i = 0; i < 50; i++) {
          var uzi = new THREE.Mesh(newGeo, new THREE.MeshPhongMaterial({color: 0x00ff00}));
          uzi.rotateY(Math.PI)
          uzi.position.x = positionX();
          uzi.position.y = Math.floor(Math.random() * 200) + 1
          uzi.position.z = (Math.random() - 0.5) * 1000;
          uzis.push(uzi)
          scene.add(uzi)
        }

      }, onProgress, onError);

      function loadWireframe() {
        loaderSkull.load(skullObj, function(geometry) {
          var material = new THREE.MeshBasicMaterial({
            color: 0x00FF00,
            wireframe: true,
          });

          geometry.rotateY(Math.PI)
          geometry.rotateZ(Math.PI)
          geometry.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              if (child.name.indexOf('dents') !== -1) {
                child.material =  new THREE.MeshBasicMaterial({
                  color: 0x00FF00,
                  wireframe: true
                });
              } else {
                child.material = material;
              }
              child.castShadow = true;
              child.scale.set( 0.26, 0.26, 0.26 );
            }
            wireframeComponents.push(child)
          });
          geometry.castShadow = true;
          wireframe = geometry;
          scene.add(geometry)
          animateJaw()
        })
      }

      function animateJaw() {
        var userOpts	= {
          range		: skullComponents[1].position.y,
          duration	: 2500,
          delay		: 0,
          easing		: 'Elastic.EaseInOut'
        };
        var current	= { y: -userOpts.range };

        skullAnimation = new TWEEN.Tween(current).to({y: +userOpts.range + 10}, 1000)
        var tweenClose = new TWEEN.Tween(current).to({y: userOpts.range}, 1000)

        skullAnimation.onUpdate(function(){
          skullComponents[1].position.y = current.y;
          skullComponents[3].position.y = current.y;
          wireframeComponents[1].position.y = current.y;
          wireframeComponents[3].position.y = current.y;
        });

        tweenClose.onUpdate(function(){
          skullComponents[1].position.y = current.y;
          skullComponents[3].position.y = current.y;
          wireframeComponents[1].position.y = current.y;
          wireframeComponents[3].position.y = current.y;
        });

        skullAnimation.easing(TWEEN.Easing.Elastic.InOut)
        tweenClose.easing(TWEEN.Easing.Elastic.InOut)

        skullAnimation.chain(tweenClose)
        tweenClose.chain(skullAnimation)
        skullAnimation.start();
      }

      // world
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2( 0x000000, 0.002 );
      THREE.ImageUtils.crossOrigin = '';
      var texture = THREE.ImageUtils.loadTexture( groundTexture );
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 60, 60 );

      var planeGeo = new THREE.PlaneGeometry( Math.PI * window.innerWidth, Math.PI * window.innerHeight, 32 );
      var planeMaterial = new THREE.MeshPhongMaterial({
          // color: 0xf50066,
          color: 0x00ff00,
          // map: texture,
      });
      // var planeMaterial = new THREE.MeshBasicMaterial({color: 0xf50066});
      planeMaterial.map = texture;
      var plane = new THREE.Mesh( planeGeo, planeMaterial );
      plane.rotateX(- Math.PI / 2);
      plane.position.y = -50;
      plane.castShadow = true;
      scene.add( plane );


      // lights
      var light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 0, 0, 100 );
      scene.add( light );
      light = new THREE.DirectionalLight( 0x002288 );
      light.position.set( -1, -1, -1 );
      scene.add( light );
      light = new THREE.AmbientLight( 0x222222 );
      scene.add( light );
      // renderer
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setClearColor( scene.fog.color );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );

      // composer effects
      composer = new THREE.EffectComposer( renderer );
      composer.addPass( new THREE.RenderPass( scene, camera ) );
      var glitchPass = new THREE.GlitchPass();
      glitchPass.renderToScreen = true;
      composer.addPass( glitchPass );

      // Sound
      container = document.getElementById( 'container' );
      container.appendChild( renderer.domElement );

      window.addEventListener( 'resize', onWindowResize, false );
      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      renderWebgl();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderWebgl();
    }
    function onDocumentMouseMove( event ) {
      mouseX = ( event.clientX - windowHalfX ) /8;
      mouseY = ( event.clientY - windowHalfY ) /8;
    }
    function animate() {
      if (!ended) {
        requestAnimationFrame( animate );
        renderWebgl();
      }
    }
    function renderWebgl() {
      // var timer = Date.now() * 0.0001;
      if (!locked) {
        camera.position.x += ( -mouseX - camera.position.x + 60 ) * .05;
        camera.position.y += (  mouseY - camera.position.y ) * .05;
      }
      if (!centered) {
        camera.lookAt(scene.position );
      }

      if (rendered) {
        for (var i = 0; i < uzis.length; i++) {
          uzis[i].rotateY((Math.random() * 0.08));
        }
      }
      TWEEN.update();
      composer.render( scene, camera );
    }
  },

  render() {
    return (
      <div>
        <div ref="intro" id="container">
        </div>
        <div id="warning" className="warning">
          <div className="warning__inner">
            <p className="alert">
              You are now entering a dangerous zone.
              Do you wish to continue
            </p>
            <span className="blink">?</span>
          </div>
        </div>
      </div>
    );
  }
});
