const tabs = [...document.querySelector('.tabs').children]
const tabContents = [...document.querySelector('.tab-content').children]
let activeTab = '0'

tabs.forEach(tab => tab.addEventListener('click', handleTabChange))

function handleTabChange(e) {
  const { tab: clickedTab } = e.target.dataset
  if (clickedTab === activeTab) {
    return
  }

  activeTab = clickedTab
  setActiveTabContent(clickedTab)
  setActiveTabButton(clickedTab)
}

function setActiveTabContent(clickedTab) {
  tabContents.forEach(tabContent => {
    if (tabContent.dataset.tab === clickedTab) {
      tabContent.classList.add('active')
    } else {
      tabContent.classList.remove('active')
    }
  })
}

function setActiveTabButton(clickedTab) {
  tabs.forEach(tab => {
    if (clickedTab === tab.dataset.tab) {
      tab.classList.add('primary')
      tab.classList.remove('secondary')
    } else {
      tab.classList.add('secondary')
      tab.classList.remove('primary')
    }
  })
}
