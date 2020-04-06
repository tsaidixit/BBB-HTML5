const e = require('../core/elements');
const ne = require('../notifications/elements');
const ce = require('../chat/elements');
const ule = require('../user/elements');

async function popupMenu(page1) {
  await page1.waitForSelector(e.options);
  await page1.click(e.options, true);
  await page1.waitForSelector(ne.settings);
  await page1.click(ne.settings, true);
}

async function enableChatPopup(test) {
  await test.waitForSelector(ne.chatPushAlerts);
  await test.page.evaluate(() => document.querySelector('[data-test="chatPushAlerts"]').children[0].click());
}

async function saveSettings(page1) {
  await page1.waitForSelector(ne.saveSettings);
  await page1.click(ne.saveSettings, true);
}

async function waitForToast(test) {
  await test.waitForSelector(ne.smallToastMsg);
  const resp = await test.page.evaluate(getTestElement, ne.smallToastMsg) !== null;
  return resp;
}

async function getLastToastValue(test) {
  await test.waitForSelector(ne.smallToastMsg);
  const toast = test.page.evaluate(async () => {
    const lastToast = await document.querySelectorAll('[data-test="toastSmallMsg"]')[0].innerText;
    return lastToast;
  });
  return toast;
}

async function getOtherToastValue(test) {
  await test.waitForSelector(ne.smallToastMsg);
  const toast = test.page.evaluate(async () => {
    const lastToast = await document.querySelectorAll('[data-test="toastSmallMsg"]')[1];
    return lastToast.innerText;
  });
  return toast;
}

async function getTestElement(element) {
  await document.querySelectorAll(element)[1];
}


async function clickOnTheOtherUser(element) {
  await document.querySelectorAll(element)[0].click();
}

async function clickThePrivateChatButton(element) {
  await document.querySelectorAll(element)[0].click();
}

async function publicChatMessageToast(page1, page2) {
  // Open private Chat with the other User
  await page1.page.evaluate(clickOnTheOtherUser, ule.userListItem);
  await page1.page.evaluate(clickThePrivateChatButton, ce.activeChat);
  // send a public message
  await page2.page.type(ce.publicChat, ce.publicMessage1);
  await page2.page.click(ce.sendButton, true);
  return ne.publicChatToast;
}

async function privateChatMessageToast(page2) {
  // Open private Chat with the other User
  await page2.page.evaluate(clickOnTheOtherUser, ule.userListItem);
  await page2.page.evaluate(clickThePrivateChatButton, ce.activeChat);
  // send a private message
  await page2.page.type(ce.privateChat, ce.message1);
  await page2.page.click(ce.sendButton, true);
  return ne.privateChatToast;
}

exports.privateChatMessageToast = privateChatMessageToast;
exports.publicChatMessageToast = publicChatMessageToast;
exports.getOtherToastValue = getOtherToastValue;
exports.getLastToastValue = getLastToastValue;
exports.enableChatPopup = enableChatPopup;
exports.getTestElement = getTestElement;
exports.saveSettings = saveSettings;
exports.waitForToast = waitForToast;
exports.popupMenu = popupMenu;
