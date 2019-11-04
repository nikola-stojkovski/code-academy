class User {
    constructor(name, surname, email, age, isActive, posts) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
        this.isActive = isActive;
        this.posts = posts
    }
}

class Post {
    constructor(text, likes, createdOn) {
        this.text = text,
        this.createdOn = createdOn,
        this.likes = likes
    }
}

module.exports = {
    Post,
    User
}