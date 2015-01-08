// **********************************************************************
// 設定項目
// **********************************************************************

// マップサイズ
var worldSize = {x: 1600, y: 1600};

// 表示区画のサイズ
var divideSize = 100;

// ファイル名と色の指定
var alliances = [
    ["neko_data.csv", "rgba(0, 0, 255, 1)"], 
//    ["kir_data.csv", "rgba(0, 255, 255, 1)"], 
    ["taiten_data.csv", "rgba(255, 165, 0, 1)"], 
    ["tsuki_data.csv", "rgba(255, 0, 0, 1)"], 
    ["furikuma.csv", "rgba(0, 200, 0, 1)"], 
//    ["dc.csv", "rgba(173, 255, 47, 1)"], 
//    ["gonta.csv", "rgba(173, 255, 47, 1)"], 
//    ["fn.csv", "rgba(173, 255, 47, 1)"], 
    ["var.csv", "rgba(210,105,30, 1)"], 
//    ["kkisk.csv", "rgba(255, 105, 180, 1)"]
]

var npc_data = [
    ["npc_list.txt", "rgba(201, 118, 116, 1)"]
]

var urlBase = "http://m17.3gokushi.jp/map.php?x=[x]&y=[y]";

var defaultColors = {
    friend: ["rgba(0, 0, 255, 1)", "rgba(0, 255, 255, 1)", "rgba(80, 77, 203, 1)"], 
    enemy: ["rgba(255, 0, 0, 1)", "rgba(255, 165, 0, 1)", "rgba(183, 65, 14, 1)"], 
    neutral: ["rgba(0, 200, 0, 1)", "rgba(173, 255, 47, 1)", "rgba(103, 228, 126, 1)"]
}

