<template>
  <div>
    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3 justify-content-center w-75">
        <div class="card-header" >𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝓉𝑜 𝒟𝒶𝓈𝒽𝒷𝑜𝒶𝓇𝒹</div>
        <div class="card-body text-dark">
          <div class="d-flex flex-column bd-highlight">
            <router-link to="/line" class="childTomato p-1 bd-highlight">
              <i class="fas fa-signal fa-sm"></i>
              <br />
              <span>
                <strong class="btn-grad">𝓛𝓲𝓷𝓮</strong>
              </span>
            </router-link>

            <router-link to="/pie" class="childYellow p-1 mt-2 bd-highlight">
              <i class="fas fa-chart-pie fa-sm"></i>
              <br />
              <span>
                <strong class="btn-pie">𝓟𝓲𝓮</strong>
              </span>
            </router-link>

            <router-link to="/bar" class="childAqua p-1 mt-2 bd-highlight">
              <i class="far fa-chart-bar fa-sm"></i>
              <br />
              <span>
                <strong class="btn-bar">𝓑𝓪𝓻</strong>
              </span>
            </router-link>

            <router-link to="/map" class="childGreen p-1 mt-2 bd-highlight">
              <i class="fas fa-map-marked-alt fa-sm"></i>
              <br />
              <span>
                <strong class="btn-map">𝓜𝓪𝓹𝓼</strong>
              </span>
            </router-link>
          </div>

          <div class="d-flex flex-row mt-5 bd-highlight justify-content-center text-black-50">
            <router-link to="/Login" class="btn-login p-2 w-25">𝓛𝓸𝓰𝓲𝓷</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
  </div>
</template>

<script>


export default {
  name: "Index",
  data() {
    return {
      isLoggedIn: false,
      user: localStorage.getItem("email")
    };
  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
  margin-left: 12%;
}
.flexChild {
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
}
.childGreen,
.childYellow,
.childAqua,
.childTomato {
  border-radius: 8px;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s;
}
.childGreen {
  background-color: rgb(83, 192, 140, 1);
}
.childGreen:hover {
  background-color: rgba(83, 192, 140, 0.6);
  transform: scale(1.02);
  margin-top: 1%;
}
.childYellow {
  background-color: rgba(251, 212, 109, 1);
}
.childYellow:hover {
  background-color: rgba(251, 212, 109, 0.6);
  transform: scale(1.02);
  margin-bottom: 1%;
}
.childAqua {
  background-color: rgba(29, 211, 189, 1);
}
.childAqua:hover {
  background-color: rgba(29, 211, 189, 0.6);
  transform: scale(1.02);
  margin-bottom: 1%;
}
.childTomato {
  background-color: rgba(160, 27, 27, 1);
}
.childTomato:hover {
  background-color: rgba(207, 27, 27, 0.6);
  transform: scale(1.02);
  margin-bottom: 1%;
}
.card-header {
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}
.flexChild:hover {
  background-color: rgba(83, 192, 140, 0.6);
  transform: scale(1.02);
}
/* 53C08C */
.flexChild1 {
  background-color: red;
}
.container-card {
  margin-top: 5vh;
}

.btn-login {
  color: white;
  border-radius: 5px;
  background-color: rgb(0, 100, 75);
  width: 15%;
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-login:hover {
  color: black;
  background-color: coral;
  transform: scale(1.02);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(53, 50, 50);
}
a:hover {
  color: white;
}



/* button scripts */

.btn-grad {
  background-image: linear-gradient(to right, #5f2c82 0%, #49a09d  51%, #5f2c82  100%)
}

.btn-grad { 
margin: 10px;
padding: 2px 2px;
text-align: center;
text-transform: uppercase;
transition: 0.5s;
background-size: 200% auto;
color: white;            
box-shadow: 0 0 20px #eee;
border-radius: 10px;
display: block;
}

.btn-grad:hover {
background-position: right center; /* change the direction of the change here */
color: #fff;
text-decoration: none;
}


.btn-pie {
  background-image: linear-gradient(to right, #403A3E 0%, #BE5869  51%, #403A3E  100%)
}

.btn-pie { 
margin: 10px;
padding: 2px 2px;
text-align: center;
text-transform: uppercase;
transition: 0.5s;
background-size: 200% auto;
color: white;            
box-shadow: 0 0 20px #eee;
border-radius: 10px;
display: block;
}
           
.btn-pie:hover {
background-position: right center; /* change the direction of the change here */
color: #fff;
text-decoration: none;
}


.btn-bar {
  background-image: linear-gradient(to right, #3a6186 0%, #89253e  51%, #3a6186  100%)
}

.btn-bar { 
margin: 10px;
padding: 2px 2px;
text-align: center;
text-transform: uppercase;
transition: 0.5s;
background-size: 200% auto;
color: white;            
box-shadow: 0 0 20px #eee;
border-radius: 10px;
display: block;
}
           
.btn-bar:hover {
background-position: right center; /* change the direction of the change here */
color: #fff;
text-decoration: none;
}

.btn-map {
  background-image: linear-gradient(to right, #73C8A9 0%, #373B44  51%, #73C8A9  100%)
}

.btn-map { 
margin: 10px;
padding: 2px 2px;
text-align: center;
text-transform: uppercase;
transition: 0.5s;
background-size: 200% auto;
color: white;            
box-shadow: 0 0 20px #eee;
border-radius: 10px;
display: block;
}
           
.btn-map:hover {
background-position: right center; /* change the direction of the change here */
color: #fff;
text-decoration: none;
}
        
         
</style>


         