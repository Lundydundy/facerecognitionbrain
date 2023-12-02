import './App.css';

import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialState = {
      input: "",
      imageURL: "",
      box: {},
      route: 'signin',
      isSignedIn : false,
      user: {
        id: "",
        name: "",
        email: '',
        entries: 0,
        joined: ''

      }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: 'signin',
      isSignedIn : false,
      user: {
        id: "",
        name: "",
        email: '',
        entries: 0,
        joined: ''

      }
    }
  }

  loadUser = (data) =>{
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      }
    )
    
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace)
    const image = document.getElementById("input");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  displayFacebox = (box) => {
    this.setState({box : box})
  }


  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageURL : this.state.input});
    fetch("https://mybackend-g1no.onrender.com/imageurl", {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
        })
      })
        .then(response => response.json())
        .then(result => {
          //console.log(result)
          if(result){
            fetch('https://mybackend-g1no.onrender.com/image', {
                method: 'put',
                headers: {
                  'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                  id: this.state.user.id
                })

            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user,{entries: count}))
            })
            .catch(err => console.log("Error", err))
          }
          this.displayFacebox(this.calculateFaceLocation(result))})
        .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState)
      } else if (route === 'home') this.setState({isSignedIn: true});
    
    this.setState({route:route});
  }

 
  render(){
  const { isSignedIn, route, box, imageURL } = this.state;
  return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      {route === "home" ? 
      (
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <ParticlesBg type="cobweb" bg={true} />
          <FaceRecognition box={box} imageURL={imageURL}/> 
        </div>

      ): 
      (
        route === "signin" ? 
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       : 
       ( route === "signout" ? 
        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       :  
       <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
       )
       
        )
      }
    </div>
  );
  }
}

export default App;
