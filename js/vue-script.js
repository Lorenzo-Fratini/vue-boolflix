function init() {
  
    new Vue({
        
      el: '#app',
      
      data: {

        apiKey: 'f0d1d0008218e6516fd1dca803b6c5da',
        userInput: '',
        searchResults: [],
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
            
            this.searchResults = data.data.results;

            // console.log(this.searchResults)
          })

          axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
              'api_key': this.apiKey,
              'query': this.userInput
          }
          })
          .then(data => {

            const results = data.data.results;

            results.forEach(result => {

              const res = result;

              const newObj = {
                "backdrop_path": res.backdrop_path,
                "genre_ids": res.genre_ids,
                "id": res.id,
                "original_language": res.original_language,
                "original_title": res.original_name,
                "overview": res.overview,
                "popularity": res.popularity,
                "poster_path": res.poster_path,
                "release_date": res.first_air_date,
                "title": res.name,
                "vote_average": res.vote_average,
                "vote_count": res.vote_count
              }

              this.searchResults.push(newObj);
            });

            // console.log(this.searchResults)
          })
        },

        flagGen: function(index) {

          const result = this.searchResults[index];
          const lenguage = result.original_language;

          if (lenguage == 'en') {
            
            return '<img src="img/en.png" alt="" class="flag"></img>'
          } else if (lenguage == 'it') {
            
            return '<img src="img/it.png" alt="" class="flag"></img>'
          } else {

            return lenguage
          }
        },

        posterGen: function(index) {

          const result = this.searchResults[index];
          const poster = result.poster_path

          console.log(poster);

          return 'https://image.tmdb.org/t/p/w300/' + poster;
        },

        starGen: function(index) {

          const result = this.searchResults[index];
          const vote = Math.ceil(result.vote_average / 2);

          let stars = '';

          if (vote == 0) {

            return '<i>Nessun voto</i>'
          }

          for (i = 0; i < vote; i++) {

            stars += '<i class="fas fa-star"></i>';
          }
          
          return stars
        }
      },
      
      mounted () {

      },         
    })
  }
  
  document.addEventListener('DOMContentLoaded', init);