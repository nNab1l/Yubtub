class App {
  switcher;
  data = [
    {
      id: 0,
      video1: "vid1.mp4",
      video2: "vid2.mp4",
    },
  ];

  constructor() {
    this.switcher = new Switcher(this, this.data);
  }
}

class Cleaner {
  clean(whereToClean) {
    document.querySelector(whereToClean).innerHTML = "";
  }
}

class Switcher {
  yubtub;
  cleaner;
  app;
  default = 0;

  constructor(app, data) {
    this.data = data;
    this.app = app;
    this.cleaner = new Cleaner();
    this.yubtub = new Yubtub(this.app, {
      video1: data[this.default].video1,
      video2: data[this.default].video2,
    });
  }

  switch(link) {
    this.cleaner.clean("body");
    this.yubtub = new Yubtub(this.app, [this.data[link]]);
  }
}

class Yubtub {
  aside;
  renderer;
  app;
  main;

  constructor(app, data) {
    console.log(data);
    this.app = app;
    this.renderer = new Renderer();
    this.main = new Main(this, data);
    this.aside = new Aside(this, data);
  }
}

class Renderer {
  render(whereToRender, whatToRender) {
    const container = document.querySelector(whereToRender);
    if (container) {
      container.appendChild(whatToRender);
    } 
  }
}

class Aside {
  yubtub;
  nextVideo;
  htmlElement;
  article;
  section;
  ul;
  li;
  vid;

  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.htmlElement = document.createElement("aside");
    this.htmlElement.classList.add("yubtub__mainvid");
    this.section = document.createElement("section");
    this.article = document.createElement("article");
    this.ul = document.createElement("ul");
    this.ul.classList.add("yubtub__ul");
    this.li = document.createElement("li");
    this.li.classList.add("yubtub__li");
    this.vid = document.createElement("video");
    this.vid.classList.add("yubtub__subvid");
    this.article.classList.add("yubtub__mainart");
    this.yubtub.renderer.render("body", this.section);
    this.yubtub.renderer.render("section", this.article);
    this.yubtub.renderer.render("article", this.htmlElement);
    this.yubtub.renderer.render("article", this.ul);
    this.yubtub.renderer.render("ul", this.li);
    this.yubtub.renderer.render("li", this.vid);
    this.nextVideo = new NextVideo(this, data, this.ul);
    this.vid.src = "./videos/" + data.video1;
    this.nextVideo.htmlElement.onclick = this.nextVideo.videoClicked.bind(
      this.nextVideo
    );
  }
}

class NextVideo {
  aside;
  htmlElement;
  sideArticle;
  ul;
  title;
  input;
  send;

  constructor(aside, data, ul) {
    this.aside = aside;
    this.data = data;
    this.sideArticle = document.createElement("article");
    this.title = document.createElement("h2");
    this.input = document.createElement("textarea");
    this.aside.yubtub.renderer.render("section", this.sideArticle);
    this.sideArticle.classList.add("yubtub__sideart");
    this.htmlElement = document.createElement("video");
    this.htmlElement.src = "./videos/" + data.video2;
    this.aside.yubtub.renderer.render("aside", this.htmlElement);
    this.htmlElement.classList.add("yubtub__mainvideo");
    this.ul = ul;
    this.sideArticle.appendChild(this.ul);
    this.ul.appendChild(this.title);
    this.ul.appendChild(this.input);
    this.title.classList.add("yubtub__title");
    this.title.innerText = "video 1";
    this.htmlElement.onclick = this.videoClicked.bind(this);
    this.comments = new Comments(this.aside.yubtub.main, data, this.input);
  }

  videoClicked() {
    const mainVideoUrl = this.aside.vid.src;
    this.aside.vid.src = this.htmlElement.src;
    this.htmlElement.src = mainVideoUrl;
  }
}

class Main {
  yubtub;
  comments;

  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.comments = new Comments(this, data);
  }
}

class Comments {
  main;
  comments;
  comment;
  send;
  textarea;

  constructor(main, data, textarea) {
    this.main = main;
    this.textarea = textarea;
    this.send = document.createElement("p");
    this.send.innerText = "send";
    this.comments = document.createElement("ul");
    this.comment = document.createElement("li");
    this.main.yubtub.renderer.render("ul", this.comments);
    this.main.yubtub.renderer.render("ul", this.send);
    this.main.yubtub.renderer.render("ul", this.comment);
    this.comments.classList.add("yubtub__comments");
    this.comment.classList.add("yubtub__comment");
    this.comments.appendChild(this.comment);
    this.send.onclick = this.addComment.bind(this);
  }

  addComment() {
    const newComment = document.createElement("li");
    newComment.innerText = this.textarea.value;
    this.comments.appendChild(newComment);
    this.textarea.value = "";
  }
}

const app = new App();
console.log(app);
