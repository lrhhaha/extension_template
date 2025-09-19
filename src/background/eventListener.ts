// 当用户点击扩展图标时，显示侧边栏
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  // 在Manifest V3中，如果有popup，这个事件不会触发
  // 这里是用于直接打开侧边栏的备用方法
  if (chrome.sidePanel) {
    chrome.sidePanel.open({ tabId: tab.id } as any);
    // chrome.sidePanel.open({ tabId: tab.id } as any);
  }
});