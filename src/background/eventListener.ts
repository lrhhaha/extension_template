// 当用户点击扩展图标时，显示侧边栏
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  // 在Manifest V3中，如果有popup，这个事件不会触发
  // 这里是用于直接打开侧边栏的备用方法
  if (chrome.sidePanel) {
    chrome.sidePanel.open({ tabId: tab.id } as any);
    // chrome.sidePanel.open({ tabId: tab.id } as any);
  }
});

// 监听文档加载完成事件，向iframe注入contentScript
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0) {
    // Ensure this is an iframe
    chrome.scripting
      .executeScript({
        target: { tabId: details.tabId, frameIds: [details.frameId] },
        func: () => {
          const iframeElement = window.frameElement;
          // 忽略html2canvas生成的iframe
          if (
            iframeElement &&
            iframeElement.classList.contains("html2canvas-container")
          ) {
            return { shouldInject: false };
          }
          return {
            shouldInject: true,
            hasRunContentScript: window.hasRunContentScript,
          };
        },
      })
      .then((results) => {
        const result = results[0].result;
        if (result.shouldInject && !result.hasRunContentScript) {
          console.log(results[0].result, details);
          chrome.scripting.executeScript({
            target: { tabId: details.tabId, frameIds: [details.frameId] },
            // 相对于打包后的文件结构
            files: ["contentScripts.js"],
          });
        }
      })
      .catch((err) => {
        console.log("向iframe注入contentScripts时报错：", err);
      });
  }
});
