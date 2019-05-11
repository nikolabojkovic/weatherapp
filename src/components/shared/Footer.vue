<template>
    <div id="footer">
        <div class="footer-content">
            <div class="row">
                <div class="col-md-4 mb-5 mb-lg-0">
                    <h6 class="text-uppercase mb-4">Fast links</h6>
                    <p><a href="#weather-container">Go to top</a></p>
                </div>
                <div class="col-md-4 mb-5 mb-lg-0">
                    <h6 class="text-uppercase mb-4">About</h6>
                    <div>Developer portfolio application</div>
                    <div>This app is under development</div>
                </div>
                <div class="col-md-4">
                    <h6 class="text-uppercase mb-4">Find this project on GitHub</h6>
                    <p class="text-center mb-0">Font-end repository <a href="https://github.com/nikolabojkovic/weatherapp">source code</a></p>
                    <p class="text-center mb-0">Back-end repository <a href="https://github.com/nikolabojkovic/WeatherApi">source code</a></p>
                </div>
            </div>
        </div>
        <div class="copyright">Copyright © <a href="https://github.com/nikolabojkovic">Nikola Bojkovic</a> {{ new Date().getFullYear() }}</div>
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
        padding: 20px 0px;
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
        font-size: 12px;
        background-color: #45a7e7;
        padding: 20px 0px;
        color: white;
    }

    .copyright a, .footer-content a {
        color: #203b42;
    }
</style>