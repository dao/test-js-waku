import { Waku, WakuMessage } from 'js-waku';
import debug from 'debug';

const dbg = debug('test-js-waku');

export const ContentTopic = '/test-js-waku/1/text/proto';

const processIncomingMessage = async (msg: WakuMessage) => {
  const { payload } = msg;
  if (!payload || payload.length === 0) return;
  dbg('got message', payload);
};

const main = async () => {
  const waku = await Waku.create({ bootstrap: { default: true } });
  await waku.waitForConnectedPeer();
  waku.relay.addObserver(processIncomingMessage, [ContentTopic]);

  const msg = await WakuMessage.fromUtf8String('test', ContentTopic);
  await waku.relay.send(msg);
  dbg('sent message', msg);
};

main();
