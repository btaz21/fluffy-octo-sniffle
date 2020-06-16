const app = angular.module('CandleApp', [])

app.controller('MyController', ['$http', function ($http) {
  this.createForm = {}

  this.createCandle = () => {
    $http(
      {
        method:'POST',
        url:'/candles',
        data: this.createForm
      }
    ).then((response) => {
      console.log(response.data);
      this.createForm = {}
    }, (error) => {
      console.log(error);
    })
  }//createCandle end


  this.getCandles = () => {
    $http(
      {
        method:'GET',
        url: '/candles'
      }
    ).then((response) => {
      this.candles = response.data
    }, (error) => {
      console.log(error);
    })
  }//getCandles end

  this.getCandles()


}])
