var allianceInfos = [];
var dataList = [];

function drawMap(data, color) {
    var worldWidth = worldSize["x"];
    var worldHeight = worldSize["y"];
    
    // Contextの取得
    var canvas = document.getElementById('map_canvas');
    var ctx = canvas.getContext("2d");
    
    // 領地のプロット
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = "source-over";
    ctx.imageSmoothingEnabled = false;
    $(data).each(function(){
        if (this[0] != "同盟") {
            var x = 0;
            var y = 0;
            var index = 0;
            $(this).each(function(){
                if (index == 3) {
                    x = parseInt(this) + Math.floor(worldWidth / 2);
                };
                
                if (index == 4) {
                    y = parseInt(this) * -1 + Math.floor(worldHeight / 2);
                };
                
                index += 1;
            });
            
            ctx.fillRect(x, y, 1, 1);
        }
    });
    ctx.stroke();
};

// 全同盟を描画する
function drawMapAll(dataList){
    // Canvasの初期化
    initCanvas();
    
    allianceInfos = [];
    
    // 描画処理
    $(dataList).each(function(){
        drawMap(loadData(this[0], this[1]), this[1]);
    });
    
    var canvas = document.getElementById('map_canvas');
    var ctx = canvas.getContext("2d");
    var index = 0;
    var left = 10;
    var top = 10;
    var colorWidth = 10;
    var textWidth = 130;
    var height = 20;
    var margin = 2;
    var padding = 3;
    
    $(allianceInfos).each(function(){
        var color = this[1];
        var name = this[0];
        
        ctx.textBaseline = "top";
        
        ctx.fillStyle = color;
        ctx.fillRect(left, top + index * (height + margin), colorWidth, height);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillRect(left + margin + colorWidth, top + index * (height + margin), textWidth, height);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillText(name, left + margin + colorWidth + padding, top + padding + index * (height + margin));
        
        index++;
    });
}

// Canvasの初期設定
function initCanvas() {
    var worldWidth = worldSize["x"];
    var worldHeight = worldSize["y"];
    $("#map_canvas").attr("width", worldWidth + 1);
    $("#map_canvas").attr("height", worldHeight + 1);
    
    var canvas = document.getElementById('map_canvas');
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.clearRect(0, 0, worldWidth + 1, worldHeight + 1);
    ctx.fillRect(0, 0, worldWidth + 1, worldHeight + 1);
    
    // 枠線の描画
    for (var i = 1; i < divideNumber; i++) {
        ctx.beginPath();
        if (i == 8) {
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
        }
        else {
            ctx.fillStyle = "rgba(150, 150, 150, 1)";
        }
        // lineToだと何故か線が2pxになるので、fillRectで代用
        ctx.fillRect(i * divideSize, 0, 1, worldHeight + 1);
        ctx.fillRect(0, i * divideSize, worldWidth + 1, 1);
        ctx.stroke();
    }
}

function loadData(data, color) {
    var text_data = data.replace("/\"/g", "");
    var csv = parseSV(text_data, delimiter = "	");
    
    // 色分け凡例を出すために追加
    allianceInfos.push([csv[1][0], color]);
    
    return csv;
}

$(document).ready(function(){
    if (getUrlVars()["manual"]) {
        $("#formArea").css("display", "block");
        drawMapAll(dataList);
    }
    else {
        $(alliances).each(function(){
            var color = this[1];
            $.ajax({
                url: "./data/" + this[0], 
                type: 'get', 
                async: false, 
                dataType: "text", 
                success: function(data){
                    dataList.push([data, color]);
                }
            });
        });
        
        drawMapAll(dataList);
        alert("処理完了");
    }
    
    // 開発中の機能(URLパラメータ「dev=true」で有効化)
    if (getUrlVars()["dev"]) {
        $("#map_canvas").mousedown(function(e){
            // クリックするとマップの位置を表示
            var x = e.pageX - 800;
            var y = e.pageY * -1 + 800;
            var url = urlBase.replace("[x]", x).replace("[y]", y);
            window.open(url, '_blank');
        });
    }
    
    $("#map_canvas").mousemove(function(e){
        var x = e.pageX - 800;
        var y = e.pageY * -1 + 800;
        
        $("#tooltip").css("display", "inline");
        $("#tooltip").css("left", e.pageX + 15);
        $("#tooltip").css("top", e.pageY - 5);
        $("#tooltip").html(x + ", " + y);
    });
    
    $("#tooltip").mousemove(function(e){
        $("#tooltip").css("display", "none");
    });
    
    $('#submitButton').click(function(e) {
        var kind = $('select[name="kind"]').val();
        var data = $('#dataTextArea').val();
        var colors = defaultColors[kind];
        var currentIndex = defaultColors[kind + "Index"] % colors.length;
        
        dataList.push([data, colors[currentIndex]]);
        drawMapAll(dataList);
        
        defaultColors[kind + "Index"] += 1;
        
        $('#dataTextArea').val("");
        $('select[name="kind"]').val("friend");
        
        //$('#dataForm').off("submit");
        
        return false;
    });
});

function parseSV(str, delimiter){
  if(!delimiter) delimiter = ",";
  return str.split('\n').reduce(function(table,row){
    if(!table) return;
    table.push(
      row.split(delimiter).map(function(d){ return d.trim() }) //余白削除
    );
    return table;
  }, []);
}

// パラメータを取得する関数
function getUrlVars()
{
  var vars = new Object, params;
  var temp_params = window.location.search.substring(1).split('&');
  for(var i = 0; i <temp_params.length; i++) {
    params = temp_params[i].split('=');
    vars[decodeURIComponent(params[0])] = decodeURIComponent((params[1]||"").replace("+", " "));
  }
  return vars;
}

