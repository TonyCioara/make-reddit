
const Post = require('../models/post.js');

describe('Posts', () => {
    it('should create with valid attributes at POST /posts/new', done => {

        const newPost = { title: "post title", url: "https://www.google.com", summary: "post summary" };

        Post.findOneAndRemove(newPost, () => {
            Post.find((err, posts) => {
                var postCount = posts.length;
                chai
                .request('localhost:3000')
                .post('/posts/new', newPost)
                .end((err, res) => {
                    Post.find((err, posts) => {
                        postCount.should.be.equal(posts.length - 1);
                        res.should.be.equal(200);
                        done();
                    });
                });
            });
        });
    });
});