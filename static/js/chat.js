(function(win, doc, $, io) {
var Socket = io.connect(location.href);
var $chatList = $('#chat-list'),
    chatListTpl = $('#chat-list-tpl').html();

function getTpl(tpl, obj) {
    return tpl.replace(/\{(\w+)\}/g, function($0, $1) {
        return obj[$1]||$1;
    });
}

Socket.on('message', function(data) {
console.log(data);
    $chatList.append(getTpl(chatListTpl, data));
});

$(doc.forms.messageForm).submit(function(e) {
    e.preventDefault();
    var val = this.word.value.trim();

    if (val) {
        Socket.emit('message', { msg: val });
    }
});

})(window, document, jQuery, io);
