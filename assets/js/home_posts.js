 {   //$('#posts-list-container>ul').append($('<h1> Vipin Kumar</h1>'));
    console.log('post script loaded');
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){ 
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    //console.log($(' .delete-post-button', newPost));
                },error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return  $(`<li id="post-${post._id}">
                    ${ post.content} 
                    <p>
                    Written By: ${ post.user.name }
                    </p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }">Delete Post</a>
                    </small>
                    
                    <div class="post-comment">
                        <form action="/comments/create" method="POST">
                            <input type="hidden" name="postId" value="${ post._id }">
                            <textarea name="content" placeholder="Comment here..." rows="2" cols="30" required  ></textarea>
                            <input type="submit" value="add">
                        </form> 
                    </div>
                    <div class="post-comment-list">
                        <ul id="post-comments-${ post ._id }" >
                
                        </ul>
                    </div>
                </li>`)
    }


    //metod to delete post from DOM
    let deletePost = function(deleteLink){
        console.log('deletelink is: ',deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(err){
                    console.log(err.responseText);
                }
            })
            
        })
    }

    createPost();
} 