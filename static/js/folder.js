(function() {
  require.config({
    paths: {
      "jquery": "jquery.min",
      "bootstrap": "bootstrap.min",
      "raphael": "raphael.min",
      "frame-upload":"frame-upload/index"
    },
    shim: {
      "bootstrap": {
        deps: ["jquery"]
      },
      "clock": {
        deps: ["raphael"]
      },
      "frame-upload":{
        deps: ["requestAFrame"]
      }
    }
  });

  require(["bootstrap"], function() {
    var $ = jQuery;
    $("#output").on("click", function() {
      if( !window.confirm('项目输出将首先复制所有当前根目录文件到目标目录\n请确保磁盘空间充足!') ){
        return;
      }else{
        $.ajax({
          url: '/build',
          dataType: 'json',
          success: function(res) {
            if (res.error) {
              return alert('输出失败');
            } else {
              return alert('成功：' + res.command);
            }
          }
        });
      }
    });
  });

  require(["frame-upload"],function(FrameUpload){
    var el = document.getElementById('ajaxUpload');
    new FrameUpload({
      el: el,
      src: "/upload?iframe=true&_"+ +new Date,
      action: "/upload?uploadUrl="+document.title,
      onchange: function(){
        el.innerHTML = '上传中...';
        this.submit();
      },
      afterUpload: function(data){
        if(data.length){
          alert( '上传成功' );
          el.innerHTML = '上传文件';
        }else{
          alert( '上传失败' );
          el.innerHTML = '重新上传';
        }
      },
      ready: function(){
        this.setAttribute("multiple","multiple");
      }
    });
  });

  require(["clock"], function() {
    return window.Clock({
      holder: "clock",
      size: 240
    });
  });

}).call(this);