let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("collection");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      console.log("Form Opened");
    } else {
      toyFormContainer.style.display = "none";
      console.log("Form Not Open");
    }
  });

  function createResource(method, url, object) {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    })
    .then(res => res.json());
  }

  function renderCard(toyData) {
    const card = document.createElement("li");
    const toyName = document.createElement("h2");
    const toyImage = document.createElement("img");
    const likeCounter =  document.createElement("p");
    const likeBtn = document.createElement("button");

    toyName.textContent = toyData.name;

    toyImage.src = toyData.image;
    toyImage.className = "toy-avatar";

    likeCounter.textContent = `${toyData.likes} Likes`;

    likeBtn.textContent = "Like ❤️";
    likeBtn.className = "like-btn";

    card.className = "card-li";

    likeBtn.addEventListener("click", () => {
      toyData.likes += 1;
      createResource("PATCH", `http://localhost:3000/toys/${toyData.id}`, {likes: toyData.likes});
    })

    card.append(toyName,toyImage,likeCounter,likeBtn);

    document.querySelector("#toy-collection").append(card);
  }

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(renderCard))
  .catch(console.log);

  function handleSubmission (e) {
    e.preventDefault();
    console.log(e);
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    renderCard(newToy);

    createResource("POST", "http://localhost:3000/toys", newToy)
    .then(console.log)
    .catch(console.log);

  };
  document.querySelector(".add-toy-form").addEventListener('submit', handleSubmission);
});