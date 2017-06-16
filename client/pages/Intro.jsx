// Three.js stuff
var skullObj = require('vendor/models/skull3.json');
var uziObj = require('vendor/models/uzi.obj');
var groundTexture = require('vendor/textures/texture.jpg');
var gratataSound = require('vendor/sounds/gratata.ogg');
import { Link } from 'react-router';
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

  getInitialState() {
    return {
      hasSupport: true,
      countDown: 5,
      showEnter: false
    }
  },

  componentDidMount() {
    if (!Detector.webgl){
      this.setState({
        hasSupport: false
      });
      this.countDown();
      return;
    }
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
          self.setState({showEnter: true})
          allSet = true
          TweenMax.staggerTo(".blink",1,{
            opacity:1,
            ease:SteppedEase.config(1),
            repeat:-1,
            repeatDelay:0.1,
          },0.5);
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
      renderer = new THREE.WebGLRenderer( { antialias: false } );
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

  countDown() {
    var counter = 5;
    var self = this;
    var interval = setInterval(function() {
      counter--;
      if (counter == 0) {
        clearInterval(interval);
        self.props.router.push('welcome');
      }
      self.setState({
        countDown: counter
      })
    }, 1000);
  },

  render() {
    var isMobile = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    return (
      <div>
        {this.state.hasSupport ?
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
                {(isMobile() && this.state.showEnter) &&
                  <p style={{display: 'block'}}><Link className="enter-the-matrix" to="welcome">Enter</Link></p>
                }
              </div>
            </div>
          </div>
          :
          <div className="graphics-warning">
            <p>Your graphics card does not support this super nice intro. You're about to be redirected in <strong>{this.state.countDown}</strong> to the main page.</p>
          </div>
        }

      </div>
    );
  }
});
