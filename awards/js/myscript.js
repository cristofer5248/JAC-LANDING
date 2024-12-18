// --- Notes ---
// https://dribbble.com/shots/4099945-Tacos-and-Trees-Marijuana-delivery-with-Tacos/attachments/939399
// 1039px is a good width

// - To Do -
// Finish designing product view
// Add Similar items to product view
// Finish the overall design as well
// *** Need to fix the animation with the test product and reuse of the first product and shit ***
// Make the search/filtering functions
// https://medium.com/@thierrymeier/filtering-and-sorting-best-practices-on-mobile-61626449cec
// Set up the cart system

// - Product Component -
Vue.component('productComp', {
    template: ` <div v-show="info.id >= 0" :class="['rela-inline', 'product-card']" :key="info.id" :style="{'animation-delay':(info.delay*0.1)+'s'}">
                    <div class="rela-block product-pic" :style="{'background': 'url('+info.img+') center no-repeat'}">
                        <div class="product-view-button" @click="view(info.id)">Ver</div>
                    </div>
                    <div class="rela-block product-info">
                        <div class="rela-block">
                            <p>{{info.name}}</p>
                            <p class="product-artist">{{info.artist}}</p>
                        </div>
                        <div class="vert-center product-cost">\{{info.cost}}</div>
                    </div>
                </div>`,
    props: {
        info: {
            type: Object,
            default: {
                id: 0,
                name: 'Untitled',
                artist: 'Artist',
                desc: 'Product description',
                delay: 0,
                cost: 0,
                catg: 'test',
                img: 'https://picsum.photos/600/?random',
            }
        },
    },
    methods: {
        view: function(id) { app.viewProduct(id); },
    }
});

// - Vue Stuff -
var app = new Vue({
    el: '#app',
    data: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        birthDay: new Date(`${new Date().getFullYear()}-12-15T18:00:00`),

        stars: [],
        totalStars: 500,
        sparkle: 20,

        menuOpen: false,
        cartOpen: false,
        searchOpen: false,
        productViewOpen: false,
        currentViewedProduct: 0, // Product's id
        viewedProduct: {},
        searchInput: '',
        newItems: [],
        newItemPos: 0,
        products: [
            // Test product offsets the index so that no item stays in the same position when switching categories. 
            // This makes it so that the animation will not be skipped if the first item has the same index in a category and in general.
            // Hacky I know. I'll figure out the Vue way to do this later :/
            // Transition groups perhaps? (https://codepen.io/shshaw/pen/aWdjWV)
            {
                id: -1,
                name: 'Test',
                artist: 'Test',
                desc: '',
                cost: 0,
                catg: 'Test',
                img: 'https://picsum.photos/600/?random',
                date: '0'
            },
            {
                id: 0,
                name: 'Estrella de servicio',
                artist: '',
                desc: 'Jamie Lidell is an album by Jamie Lidell released in 2013 and produced by Lidell and Justin Stanley in Lidell\'s Nashville, Tennessee studio. The lead single, "What a Shame," was released on YouTube on Nov 16, 2012.<br><br>Lidell cited Janet Jackson as the inspiration for the album, saying "I got into Rhythm Nation and Control and thought \'these are amazing songs, why don\'t they make them like this anymore? I want to make them like that!\' So that\'s what kicked it off for me." Lidell added, "it’s the sound of the era I was going for, that [Janet Jackson] "Rhythm Nation" vocal sound.”',
                cost: '',
                catg: 'Catg C',
                img: 'images/NLP1.png',
                date: 'February 19, 2001'
            },
            {
                id: 1,
                name: 'Estrella emergente',
                artist: '',
                desc: 'Discovery is the second studio album by French electronic music duo Daft Punk, released on 26 February 2001 by Virgin Records. It marks a shift from the Chicago house sound prevalent on their first studio record, Homework (1997), to a house style more heavily inspired by disco, post-disco, garage house, and R&B. Comparing their stylistic approach to their previous album, band member Thomas Bangalter described Discovery as an exploration of song structures and musical forms whereas Homework was "raw" electronic music. He also described Discovery as a reflection of the duo\'s childhood memories, when they listened to music with a more playful and innocent viewpoint.',
                cost: '',
                catg: 'Catg C',
                img: 'images/NLP2.png',
                date: 'February 26, 2001'
            },
            {
                id: 2,
                name: 'Coloring Book',
                artist: 'Chance the Rapper',
                desc: 'Coloring Book is the third mixtape by American rapper Chance the Rapper. It was produced by his group The Social Experiment, Lido, and Kaytranada, among others. For the mixtape, Chance also collaborated with musicians such as Kanye West, Young Thug, Francis and the Lights, Justin Bieber, Kirk Franklin, and the Chicago Children\'s Choir.<br><br>Coloring Book was released on May 13, 2016, exclusively on Apple Music, before being made available to other streaming services on May 27. It was the first album to chart on the Billboard 200 solely on streams, peaking at number eight, while receiving widespread acclaim from critics who praised its fusion of hip hop and gospel sounds. It won for Best Rap Album at the 2017 Grammy Awards. It was also the first streaming-only album ever to win a Grammy.',
                cost: 25,
                catg: 'Catg B',
                img: 'images/centro2.png',
                date: 'May 13, 2016'
            },
            {
                id: 3,
                name: 'Awake',
                artist: 'Tycho',
                desc: 'Awake is the third studio album by the American ambient music project Tycho, released on 18 March 2014 by Ghostly International.It is the second album in a \'trilogy\' by the project, beginning with Dive in 2011 and concluding with Epoch in 2016.',
                cost: 20,
                catg: 'Catg A',
                img: 'images/celulas/2.jpg',
                date: 'March 18, 2014'
            },
            {
                id: 4,
                name: 'Malibu',
                artist: 'Anderson .Paak',
                desc: 'Malibu is the second studio album by American singer Anderson Paak. It was released on January 15, 2016, by Steel Wool, OBE, Art Club and Empire Distribution following the release of his EP, Link Up & Suede, with Knxwledge (credited as the duo, NxWorries).<br><br>The album was supported by four singles: "The Season / Carry Me", "Am I Wrong", "Room in Here" and "Come Down". Malibu received widespread critical acclaim, placing highly on several music critics\' end-of-year lists. It received a Grammy nomination for Best Urban Contemporary Album.',
                cost: 20,
                catg: 'Catg B',
                img: 'images/centro4.png',
                date: 'January 15, 2016'
            },
            {
                id: 5,
                name: 'Endless Fantasy',
                artist: 'Anamanaguchi',
                desc: 'Endless Fantasy is the second studio album by the American chiptune band Anamanaguchi. The album was released on May 14, 2013 in the US through the band\'s own dream.hax record label. It was released on September 30, 2013 in the UK by Alcopop! Records<br><br>On May 3, 2013, Anamanaguchi provided a Kickstarter project for the album. In just 11 hours, their funding goal of $50,000 was reached. At the end of its run, the project was backed by 7,253 people who contributed to raising a grand total of $277,399, making it the second most successful music project to be funded on Kickstarter at the time, behind that of singer Amanda Palmer.<br><br>On May 23, 2013, the album debuted at No. 1 in Billboard\'s Heatseekers Albums chart as well as No. 2 in Dance/Electronic Albums.',
                cost: 20,
                catg: 'Catg D',
                img: 'images/celulas/4.jpg',
                date: 'May 14, 2013'
            },
            {
                id: 6,
                name: 'Refresh',
                artist: 'Trey Frey',
                desc: '',
                cost: 20,
                catg: 'Catg D',
                img: 'images/celulas/7.jpg',
                date: 'January 20, 2015'
            },
            {
                id: 7,
                name: 'Tres Frais',
                artist: 'Trey Frey',
                desc: '',
                cost: 20,
                catg: 'Catg D',
                img: 'images/celulas/6.jpg',
                date: 'January 21, 2015'
            },
            {
                id: 8,
                name: 'Transistor OST',
                artist: 'Darren Korb',
                desc: 'Transistor\'s soundtrack was written and produced by Darren Korb. It was released simultaneously with the game on May 20, 2014. Ashley Lynn Barrett, who was the female vocalist in Bastion\'s soundtrack, returned to provide vocals for "The Spine", "In Circles", "We All Become", "Signals", and "Paper Boats".The musical style of the soundtrack has been described by Korb as "old-world electronic post-rock". To fit that genre of music, the instruments used includes electric guitars, harps, accordions, mandolins, electric piano, and synth pads. Additionally, an EQ filter is overlaid over the music during the pause and "TURN()" menus to have a distant, blurred sound.<br><br>The soundtrack sold 48,000 copies within the first ten days of release.',
                cost: 20,
                catg: 'Catg E',
                img: 'images/celulas/5.jpg',
                date: 'May 20, 2014'
            },
            {
                id: 9,
                name: 'Illumination',
                artist: 'Miami Horror',
                desc: 'Illumination is the debut studio album by Australian electronic music band Miami Horror, released on 20 August 2010 by EMI. The album was nominated for Best Dance Release at the ARIA Music Awards of 2011.',
                cost: 20,
                catg: 'Catg A',
                img: 'images/celulas/8.jpg',
                date: 'January 19, 2015'
            },
            {
                id: 10,
                name: 'Odyssey',
                artist: 'HOME',
                desc: '',
                cost: 25,
                catg: 'Catg A',
                img: 'images/celulas/3.jpg',
                date: 'July 1, 2014'
            },
            {
                id: 11,
                name: 'Estrella Persistente',
                artist: '',
                desc: 'Madvillainy is the debut album by American hip hop duo Madvillain, a group consisting of MF Doom (MC) and Madlib (producer). It was released on March 23, 2004 on Stones Throw Records. The album was recorded between 2002 and 2004 and was produced entirely by Madlib, with the exception of "The Illest Villains" which was produced by both Madlib and Doom. Madlib created most of the album\'s instrumentals during a trip to Brazil, where the production was composed in his hotel room using minimal amounts of equipment.',
                cost: '',
                catg: 'Catg C',
                img: 'images/NLP3.png',
                date: 'February 19, 2001'
            },
            {
                id: 12,
                name: 'All Possible Futures',
                artist: 'Miami Horror',
                desc: '',
                cost: 25,
                catg: 'Catg A',
                img: 'images/celulas/1.jpg',
                date: 'April 7, 2015'
            },
            {
                id: 13,
                name: 'Prom King',
                artist: 'Skylar Spence',
                desc: '',
                cost: 25,
                catg: 'Catg X',
                img: 'https://i.scdn.co/image/fea11053422e15bacd0affe4527d2afc4b9b2d06',
                date: 'September 18, 2001'
            },
            {
                id: 14,
                name: 'Estrella Influencer',
                artist: '',
                desc: 'Demon Days is the second studio album by British virtual band Gorillaz, released on 11 May 2005 in Japan and on 23 May internationally by Parlophone Records and in the United States by Virgin Records. The album features contributions from De La Soul, Neneh Cherry, Martina Topley-Bird, Roots Manuva, MF Doom, Ike Turner, Bootie Brown of the Pharcyde, Shaun Ryder, Dennis Hopper, the London Community Gospel Choir, and a children\'s choir. Frontman Damon Albarn brought in Danger Mouse as producer.<br><br>Demon Days entered the UK charts at number 1 and the US charts at number 6, outperforming the band\'s eponymous 2001 debut album. The album has sold eight million copies worldwide. The album features the singles "Feel Good Inc.", "DARE", "Dirty Harry", "Kids with Guns", and "El Mañana". As with their debut album, the release of Demon Days and its respective live performances were both accompanied by various multimedia. ',
                cost: '',
                catg: 'Catg C',
                img: 'images/NLP4.png',
                date: 'May 11, 2005'
            },
            {
                id: 15,
                name: 'Green EP',
                artist: 'Dirty Honkers',
                desc: '',
                cost: 25,
                catg: 'Catg B',
                img: 'images/centro3.png',
                date: 'April 29, 2016'
            },
            {
                id: 16,
                name: 'Fez OST',
                artist: 'Disasterpeace',
                desc: 'Rich Vreeland, also known as Disasterpeace, composed the game\'s chiptune-esque electronic soundtrack. Despite his background in chiptune, Vreeland limited his use of that genre\'s mannerisms in the score. He worked with soft synth pads and reverb to push the score closer to an 1980s synthesizer sound. He also reduced reliance on percussion and incorporated distortion techniques like bitcrushing and wow. Vreeland opted for slower passages with varying tempos that could "ebb, flow, and breathe with the player".He left some portions of Fez without music. Vreeland worked on its soundtrack at night for about 14 months while scoring Shoot Many Robots, and Brandon McCartin of Aquaria contributed the game\'s sound effects',
                cost: 25,
                catg: 'Catg E',
                img: 'images/celulas/6.jpg',
                date: 'April 20, 2012'
            },
            {
                id: 17,
                name: 'Semi Social EP',
                artist: 'The Moondrops',
                desc: '',
                cost: 5,
                catg: 'Catg A',
                img: 'images/centro1.png',
                date: 'January 6, 2018'
            },
            {
                id: 18,
                name: 'Estrella Radioactiva',
                artist: '',
                desc: '',
                cost: '',
                catg: 'Catg C',
                img: 'images/NLP5.png',
                date: 'February 19, 2001'
            },
            {
                id: 19,
                name: 'Estrella Uber',
                artist: '',
                desc: '',
                cost: '',
                catg: 'Catg C',
                img: 'images/NLP6.png',
                date: 'February 19, 2001'
            },
            {
                id: 20,
                name: 'Semi Social EP',
                artist: 'The Moondrops',
                desc: '',
                cost: 5,
                catg: 'Catg E',
                img: 'images/NLP7.png',
                date: 'February 19, 2001'
            },
            {
                id: 21,
                name: '¿?',
                artist: '',
                desc: '',
                cost: '',
                catg: 'Catg C',
                img: 'images/NLP8.png',
                date: 'February 19, 2001'
            },
            // {
            //     id: 22,
            //     name: '1+1?',
            //     artist: '',
            //     desc: '',
            //     cost: '',
            //     catg: 'Catg C',
            //     img: 'images/NLP8.png',
            //     date: 'February 19, 2001'
            // },            
        ],
        filteredProducts: [],
        displayedProducts: [],
        displayPos: 0,
        catg: ['All','Catg A','Catg B','Catg C','Catg D','Catg E'],
        currentCatg: 'Catg C',
    },
    methods: {
        countdown() {
            const birthDayDate = new Date(this.birthDay);
            const currentDate = new Date();
            const totalSeconds = (birthDayDate - currentDate) / 1000;
      
            this.days = Math.floor(totalSeconds / 3600 / 24);
            this.hours = Math.floor(totalSeconds / 3600) % 24;
            this.minutes = Math.floor(totalSeconds / 60) % 60;
            this.seconds = Math.floor(totalSeconds) % 60;

            
        },
        createStars() {
            for (let i = 0; i < this.totalStars; i++) {
              let sizeClass = "small";
              if (i % 2 === 0) {
                sizeClass = "small";
              } else if (i % 3 === 0) {
                sizeClass = "medium";
              } else {
                sizeClass = "large";
              }
      
              this.stars.push({
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() * this.sparkle + "s",
                size: sizeClass
              });
            }
        },

        formatTime(time) {
            return time < 10 ? `0${time}` : time;
          },
        init: function() {
            app.updateNewItems();
            app.updateFilteredProducts();
        },
        updateNewItems: function() {
            // sort all of the products by date and then take the 10 newest
            this.newItems = [];
            var arr = [];
            // 1 because of the test product (Need to fix that)
            for(var i = 1; i < this.products.length; i++) {arr.push(this.products[i])}
            arr.sort(function(a, b){ return (new Date(b.date)).getTime() - (new Date(a.date)).getTime() });
            
            for(var i = 0; i < 13 && i < arr.length; i++) { this.newItems.push(arr[i]) }
        },
        updateNewItemPos: function(num) {
            this.newItemPos += num;
            // Checks
            if(this.newItemPos < 0) { this.newItemPos = 0 }
            if(this.newItems.length > 1 && (this.newItemPos > this.newItems.length - 1)) { 
                this.newItemPos = this.newItems.length - 1
            }
        },
        updateFilteredProducts: function() {
            this.filteredProducts = [];
            for(var i in this.products) {
                
                if(this.products[i].catg === this.currentCatg || this.currentCatg === 'All') { this.filteredProducts.push(this.products[i]) }
            }
            app.updateDisplayedProducts();
        },
        updateDisplayedProducts: function() {
            this.displayedProducts = [];
            this.displayPos = 0;
            app.addDisplayedProducts();
        },
        addDisplayedProducts: function() {
            if((this.filteredProducts.length - this.displayPos) <= 12) {  
                                             
                this.displayedProducts = JSON.parse(JSON.stringify( this.filteredProducts ));
                for(var i = 0; i < this.displayedProducts.length; i++) { this.displayedProducts[i].delay = (i - this.displayPos); }
                this.displayPos = this.filteredProducts.length;
            } else {
                // The ternary is for the test product. I really need to fix that.... :/
                for(var i = 0; i < (this.displayPos===0?13:12); i++) {  
                                       
                    this.displayedProducts.push(this.filteredProducts[i + this.displayPos]);
                    this.displayedProducts[i+this.displayPos].delay = (i);
                }
                this.displayPos = this.displayedProducts.length;
            }
        },
        updateViewedProduct: function() { 
            this.viewedProduct = (app.products.filter(function(el){ return el.id === app.currentViewedProduct }))[0]; 
        },
        viewProduct: function(id) {
            alert('Comming soon');
            // this.currentViewedProduct = id; 
            // app.updateViewedProduct(); 
            // this.productViewOpen = true;
        },
    },
    mounted() {
        this.countdown();
        this.createStars();
        setInterval(this.countdown, 1000);
        
      }
});

app.init();

// Scroll Function
// window.addEventListener('scroll', function() { app.pageScrolled = (window.scrollY > 0); }, false);