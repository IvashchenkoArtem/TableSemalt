Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('LL')
    }
})


let app = new Vue({
    el: '#app',

    data() {
        return {
            sitemaps: [],
            sitemapsDisplay: [],
            filter: "All sitemaps",
            isDone: false,
            isVisible: false,
            count: 0,
            allCheckBox: false
        }
    },

    methods: {
        setCheckBoxes() {
            this.allCheckBox = !this.allCheckBox;

            if (this.allCheckBox) {
                this.sitemapsDisplay.map(item => {
                    item.isDone = true;
                    this.isVisible = true;
                    this.count = this.sitemapsDisplay.length;
                });
            } else {
                this.sitemapsDisplay.map(item => {
                    item.isDone = false;
                    this.isVisible = false;
                    this.count = 0
                });
            }
        }
    },

    watch: {
        filter: {
            handler() {
                console.log(this.sitemaps)
                if (this.filter === "All sitemaps") {
                    return this.sitemapsDisplay = this.sitemaps;
                }

                if (this.filter === "Success") {
                    return this.sitemapsDisplay = this.sitemaps.filter(elem => elem.errors === 0)
                }

                if (this.filter === "Couldn't fetch") {
                    return this.sitemapsDisplay = ''
                }

                if (this.filter === "Errors") {
                    return this.sitemapsDisplay = this.sitemaps.filter(elem => elem.errors > 0);
                }

            },
            deep: true
        },
        sitemapsDisplay: {
            handler() {
                if (this.sitemapsDisplay.find(item => item.isDone === false)) {
                    this.allCehckBox = false;
                }
                if (this.sitemapsDisplay.find(item => item.isDone === true)) {
                    this.isVisible = true;
                } else {
                    this.isVisible = false;
                }

                let count = 0;
                for (let i of this.sitemapsDisplay) {
                    if (i.isDone) {
                        count++;
                    }
                }

                this.count = count;
                this.count === this.sitemapsDisplay.length ? this.allCehckBox = true : this.allCehckBox = false;

            },
            deep: true
        }
    },
    mounted() {
        fetch('https://semalt.net/dev/api/v1/example/test/')
            .then(response => response.json())
            .then(json => {
                this.sitemaps = json.result.sitemap;
                this.sitemapsDisplay = this.sitemaps;
                this.sitemapsDisplay.map(item => item.isDone = false);
                console.log(json.result.sitemap)
            })
    },
})
