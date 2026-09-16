(function(){
  function addAnalyticsButton(){
    if(document.getElementById("munawar-assessment-analytics-link")) return;
    const btn=document.createElement("a");
    btn.id="munawar-assessment-analytics-link";
    btn.href="/admin/assessment-analytics.html";
    btn.textContent="Assessment Analytics";
    btn.title="Open HR Skill Assessment analytics";
    Object.assign(btn.style,{
      position:"fixed",right:"22px",bottom:"22px",zIndex:"99999",
      background:"#1c5fd4",color:"#fff",textDecoration:"none",
      padding:"11px 15px",borderRadius:"10px",fontFamily:"Arial,sans-serif",
      fontSize:"13px",fontWeight:"700",boxShadow:"0 8px 24px rgba(28,95,212,.25)"
    });
    document.body.appendChild(btn);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",addAnalyticsButton);
  else addAnalyticsButton();
})();