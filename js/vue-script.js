function init() {
  
    new Vue({
        
      el: '#app',
      
      data: {

        headClass: 'display-none',
        searched: '',
        logoNetflix: 'https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
        apiKey: 'f0d1d0008218e6516fd1dca803b6c5da',
        imgCall: 'https://image.tmdb.org/t/p/w342/',
        maxStars: 5,
        userInput: 'matrix',
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

          this.headClass = 'display-block';

          const params = {
            params: {
              'api_key': this.apiKey,
              'query': this.userInput,
              'language' : 'it-IT'
            }
          }

          axios.get('https://api.themoviedb.org/3/search/movie', params)
          .then(data => {
            
            this.movieResult = data.data.results;
              
            this.movieResult.forEach(result => {
                  
              result.file_type = 'movie';

              this.searchResults.push(result);
            });

            //console.log('movie');
            //console.log(this.movieResult)

            this.searched = this.userInput;
            this.userInput = '';
          })

          axios.get('https://api.themoviedb.org/3/search/tv', params)
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

        isFlaggable: function(lang) {

          return lang == 'en' || lang == 'it';
        },

        starGen: function(vote) {

          // console.log('starGen');

          return Math.ceil(vote / 2);
        }
      },
    })
  }
  
  document.addEventListener('DOMContentLoaded', init);