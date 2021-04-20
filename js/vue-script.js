function init() {
  
    new Vue({
        
      el: '#app',
      
      data: {

        apiKey: 'f0d1d0008218e6516fd1dca803b6c5da',
        imgCall: 'https://image.tmdb.org/t/p/w300/',
        maxStars: 5,
        userInput: '',
        flagSrc: {
          'en' : 'en.png',
          'it' : 'it.png'
        },
        movieResults: [],
        tvResults: [],
        searchResults: []
      },

      methods: {
        
        search: function() {

          
          this.searchResults = [];

          axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
              'api_key': this.apiKey,
              'query': this.userInput,
              'language' : 'it-IT'
          }
          })
          .then(data => {
            
            this.movieResult = data.data.results;
              
            this.movieResult.forEach(result => {
                  
              result.file_type = 'movie';

              this.searchResults.push(result);
            });

            //console.log('movie');
            //console.log(this.movieResult)

            this.userInput = '';
          })

          axios.get('https://api.themoviedb.org/3/search/tv', {
              params: {
                  'api_key': this.apiKey,
                  'query': this.userInput,
                  'language' : 'it-IT'
              }
              })
              .then(data => {

                const results = data.data.results;

                this.tvResults = results;

                this.tvResults.forEach(result => {
                  
                  result.original_title = result.original_name;
                  result.release_date = result.first_air_date;
                  result.title = result.name;
                  result.file_type = 'tv';

                  this.searchResults.push(result);
                });

                //console.log('tv');
                //console.log(this.tvResults);
                //console.log('all');
                //console.log(this.searchResults);
              })
        },

        starGen: function(vote) {

          console.log('starGen');

          return Math.ceil(vote / 2);
        }
      },
      
      computed: {

        stars: function() {

          
        }
      },         
    })
  }
  
  document.addEventListener('DOMContentLoaded', init);