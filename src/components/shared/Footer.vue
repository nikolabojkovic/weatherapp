<template>
    <div id="footer">
        <div class="footer-content">
            <div class="row">
                <div class="col-md-4 mb-1">
                    <div class="p-4 footer-card">
                        <h6 class="text-uppercase mb-2">Fast links</h6>
                        <p><a href="#weather-container">Go to top</a></p>
                    </div>                    
                </div>
                <div class="col-md-4 mb-1">
                    <div class="p-4 footer-card">
                        <h6 class="text-uppercase mb-2">About</h6>
                        <div>This is a developer portfolio application</div>
                        <div>This app is under development</div>
                    </div>
                </div>
                <div class="col-md-4 mb-1">
                    <div class="p-4 footer-card">
                        <h6 class="text-uppercase mb-2">Find this app on GitHub</h6>
                        <p class="text-center mb-0">Web API (C#) repository <a href="https://github.com/nikolabojkovic/weatherapp">source code</a></p>
                        <p class="text-center mb-0">SPA (VueJs) repository <a href="https://github.com/nikolabojkovic/WeatherApi">source code</a></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div>Copyright © <a href="#">NBODevelopment</a> {{ new Date().getFullYear() }}. All rights reserved.</div>
            <div>Development and design by <a href="https://github.com/nikolabojkovic">Nikola Bojkovic</a></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Footer',
  date() {
      return { 
      }
  }
}
</script>
<style>
    .footer-content {
        background-color: #64befa;
        padding: 40px 0px;
        color: white;
    }

    .footer-content .row {
        margin: 10px 0px;
        font-size: 16px;
    }

    .footer-content h6{
        font-size: 18px;
    }

    .copyright {
        text-align: center;
        font-size: 14px;
        background-color: #45a7e7;
        padding: 20px 0px;
        color: white;
    }

    .copyright a, .footer-content a {
        color: white;
        font-weight: bolder;
        text-decoration: none;
    }

    .footer-content h6 {
        font-weight: 900;
        border-bottom: 1px solid white;
        padding-bottom: 5px;
    }

    .footer-card {
        background-color: #45a7e7;
        border-radius: 4px;
    }
</style>