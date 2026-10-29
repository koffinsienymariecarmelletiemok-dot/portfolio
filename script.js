document.getElementById("annee").textContent = new Date().getFullYear();

// Réseau animé du hero : des points reliés entre eux quand ils sont proches
(function(){
  var c = document.getElementById("reseau"), x = c.getContext("2d");
  var calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pts = [], W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function taille(){
    W = c.clientWidth; H = c.clientHeight;
    c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr,0,0,dpr,0,0);
    var n = Math.round(Math.min(70, W * H / 14000));
    pts = [];
    for (var i = 0; i < n; i++) pts.push({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25});
  }
  function dessiner(){
    x.clearRect(0,0,W,H);
    var d = Math.min(150, W/4);
    for (var i = 0; i < pts.length; i++){
      var p = pts[i];
      if (!calme){ p.x += p.vx; p.y += p.vy; if (p.x<0||p.x>W) p.vx*=-1; if (p.y<0||p.y>H) p.vy*=-1; }
      x.fillStyle = "rgba(194,162,101,.8)";
      x.beginPath(); x.arc(p.x,p.y,1.8,0,6.283); x.fill();
      for (var j = i+1; j < pts.length; j++){
        var q = pts[j], dx = p.x-q.x, dy = p.y-q.y, L = Math.sqrt(dx*dx+dy*dy);
        if (L < d){ x.strokeStyle = "rgba(194,162,101," + (0.28*(1-L/d)) + ")"; x.lineWidth = 1; x.beginPath(); x.moveTo(p.x,p.y); x.lineTo(q.x,q.y); x.stroke(); }
      }
    }
    if (!calme) requestAnimationFrame(dessiner);
  }
  taille(); dessiner();
  window.addEventListener("resize", function(){ taille(); if (calme) dessiner(); });
})();