{   console.log('comment script loaded');
    // method to submit comment data using AJAX
    const createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    const comment = data.data.comment;
                    const user = data.data.user;
                    let newComment = newCommentDom(comment, user);
                    $(`#post-${comment.post}>div>ul`).prepend(newComment);
                },error: function(err){
                    console.log('error', err);
                }
            });
        });
    }

    // to create comment in DOM
    let newCommentDom = function(comment, user){
        return $(`<li id="comment-${comment._id}"> 
        <p>
            ${ comment.content }
            <br>
            <small>
                ${ user.name }
            </small>
            <br>
             ${(() => {
                 if(user && user.id == comment.user)
                    return html`<a href="/comments/destroy/${ comment.id }">delete</a>`
                })()
             }
        </p>
    </li>`);
    };

    createComment();
}