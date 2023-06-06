class App{
    switcher;
    data = [
    {
        id: 0,
        video: "vid1.mp4",
        link: 1,
    },
    {
        id: 1,
        video: "vid2.mp4",
        link: 0,
    }
]

    constructor(){
        this.switcher = new Switcher(this, this.data);
    }
}

class Cleaner{
    clean(whereToClean){
        document.querySelector(whereToClean).innerHTML = "";
    }
}

class Switcher{
    yubtub;
    cleaner;
    app;
    default = 0;

    constructor(app, data){
        this.data = data;
        this.app = app;
        this.yubtub = new Yubtub(this.app, data[this.default]);
        this.cleaner = new Cleaner();
    }

    switch(link){
        this.cleaner.clean("body")
        this.yubtub = new Yubtub(this.app, this.data[link])
    }
}

class Yubtub{
    aside;
    renderer;
    app;

    constructor(app, data){
        console.log(data);
        this.app = app;
        this.renderer = new Renderer();
        this.aside = new Aside(this, data);
    }
}

class Renderer{
    render(whereToRender, whatToRender){
        document.querySelector(whereToRender).appendChild(whatToRender);
    }
}

class Aside{
    yubtub;
    Nextvideo;
    htmlElement;

    constructor(yubtub, data){
        this.yubtub = yubtub;
        this.htmlElement = document.createElement("aside");
        this.yubtub.renderer.render("body", this.htmlElement);
        this.Nextvideo = new Nextvideo(this, data);
    }
}

class Nextvideo{
    aside;
    htmlElement;
    constructor(aside, data){
        this.aside = aside;
        this.data = data;
        this.htmlElement = document.createElement("video");
        this.htmlElement.src = "./videos/" + data.video;
        this.aside.yubtub.renderer.render("aside", this.htmlElement);

        this.htmlElement.onclick = this.videoClicked;
    }

    videoClicked = () => {
        this.aside.yubtub.app.switcher.switch(this.data.link);
    }
}

const app = new App();
console.log(app);