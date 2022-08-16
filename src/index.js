let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(renderToyCard))
  .catch(err => console.log(err));

  function renderToyCard(toyData) {
    const toyCard = document.createElement("div");
    const name = document.createElement("h2");
    const image = document.createElement("img");
    const likes = document.createElement("p");
    const likeBtn = document.createElement("button");

    toyCard.className = "card"
    image.className = "toy-avatar";
    likeBtn.className = "like-btn";

    name.textContent = toyData.name;
    image.src = toyData.image;
    likes.textContent = `${toyData.likes} Likes`;
    likeBtn.textContent = "Like ❤️";
    likeBtn.id = toyData.id;

    likeBtn.addEventListener("click", () => {
      toyData.likes += 1;
      likes.textContent = `${toyData.likes} Likes`;
      fetch(`http://localhost:3000/toys/${toyData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: toyData.likes
        })
      })
    })

    toyCard.append(name, image, likes, likeBtn);
    document.querySelector("#toy-collection").append(toyCard);

  }

  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", handleForm);

  function handleForm(e) {

    e.preventDefault();

    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })

    renderToyCard(newToy);
  }

});
