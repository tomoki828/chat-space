$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__message-list__contents">
        <div class="chat-main__message-list__contents__info">
        <div class="chat-main__message-list__contents__info--member-name">
        ${message.user_name}
        </div>
        <div class="chat-main__message-list__contents__info--date-and-time">
        ${message.created_at}
        </div>
        </div>
        <div class="chat-main__message-list__contents--message">
        <p class="chat-main__message-list__contents--message-content">
        ${message.content}
        </p>
        <img class="chat-main__message-list__contents--message-image" src=${message.image}>
        </div>
        </div>`
    return html;
  }else {
    var html =
    `<div class="chat-main__message-list__contents">
     <div class="chat-main__message-list__contents__info">
     <div class="chat-main__message-list__contents__info--member-name">
     ${message.user_name}
     </div>
     <div class="chat-main__message-list__contents__info--date-and-time">
     ${message.created_at}
     </div>
     </div>
     <div class="chat-main__message-list__contents--message">
     <p class="chat-main__message-list__contents--message-content">
     ${message.content}
     </p>
     </div>
     </div>`
    return html;
  };
}
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.new_message--submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});