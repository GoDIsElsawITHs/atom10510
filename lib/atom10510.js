'use babel';

import Atom10510View from './atom10510-view';
import { CompositeDisposable } from 'atom';

export default {

  atom10510View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atom10510View = new Atom10510View(state.atom10510ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atom10510View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom10510:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atom10510View.destroy();
  },

  serialize() {
    return {
      atom10510ViewState: this.atom10510View.serialize()
    };
  },

  toggle() {
    console.log('Atom10510 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
