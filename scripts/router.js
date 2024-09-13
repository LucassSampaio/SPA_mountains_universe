export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event

    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location

    const route = this.routes[pathname] || this.routes[404]
    console.log(pathname)

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      })
    // console.log(route);
    this.alterBackground(route);
    console.log("Mudou o background?");

  }

	alterBackground(route){
		console.log("valor de route: ",route);

		const remove_home = document.body.classList.remove("home");
		const remove_exploration = document.body.classList.remove("exploration");
		const remove_universe = document.body.classList.remove("universe");
		document.body.classList.remove("_404");

		if (route === "/pages/home.html"){
			document.body.classList.add("home");
			remove_exploration;
			remove_universe;
		}else if (route === "/pages/exploration.html"){
			document.body.classList.add("exploration");
			remove_universe;
			remove_home;
		}else if (route === "/pages/universe.html"){
			document.body.classList.add("universe");
			remove_exploration;
			remove_home;
		}else{
			document.body.classList.add("_404");
			remove_home;
			remove_universe;
			remove_exploration;
    }
	}
}
