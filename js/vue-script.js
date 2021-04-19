function init() {
  
    new Vue({
        
      el: '#app',
      
      data: {

        apiKey: 'f0d1d0008218e6516fd1dca803b6c5da',
        userInput: '',
        searchResult: '',
      },

      methods: {
        
        search: function() {

          axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
              'api_key': this.apiKey,
              'query': this.userInput
          }
          })
          .then(data => {
            
            this.searchResult = data.data.results;

            // console.log(this.searchResult)
          })
        },

        flagGen: function(index) {

          const result = this.searchResult[index];
          const lenguage = result.original_language;

          if (lenguage == 'en') {
            
            return '<img src="img/en.png" alt=""></img>'
          } else if (lenguage == 'it') {
            
            return '<img src="img/it.png" alt=""></img>'
          } else {
            
            return lenguage
          }
        }
      },
      
      mounted () {

      },         
    })
  }
  
  document.addEventListener('DOMContentLoaded', init);