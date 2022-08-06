'use babel';

import DemoSlotOnlineView from './demo-slot-online-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotOnlineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotOnlineView = new DemoSlotOnlineView(state.demoSlotOnlineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotOnlineView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-online:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotOnlineView.destroy();
  },

  serialize() {
    return {
      demoSlotOnlineViewState: this.demoSlotOnlineView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotOnline was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
