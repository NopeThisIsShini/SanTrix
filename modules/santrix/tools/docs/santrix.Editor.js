/**
 * This file contains the documentation for the Editor API.
 */

/**
 * Schema instance, enables you to validate elements and its children.
 *
 * @property schema
 * @type santrix.html.Schema
 */

/**
 * DOM instance for the editor.
 *
 * @property dom
 * @type santrix.dom.DOMUtils
 * @example
 * // Adds a class to all paragraphs within the editor
 * santrix.activeEditor.dom.addClass(santrix.activeEditor.dom.select('p'), 'someclass');
 */

/**
 * HTML parser will be used when contents is inserted into the editor.
 *
 * @property parser
 * @type santrix.html.DomParser
 */

/**
 * DOM serializer for the editor. Will be used when contents is extracted from the editor.
 *
 * @property serializer
 * @type santrix.dom.Serializer
 * @example
 * // Serializes the first paragraph in the editor into a string
 * santrix.activeEditor.serializer.serialize(santrix.activeEditor.dom.select('p')[0]);
 */

/**
 * Selection instance for the editor.
 *
 * @property selection
 * @type santrix.dom.Selection
 * @example
 * // Sets some contents to the current selection in the editor
 * santrix.activeEditor.selection.setContent('Some contents');
 *
 * // Gets the current selection
 * alert(santrix.activeEditor.selection.getContent());
 *
 * // Selects the first paragraph found
 * santrix.activeEditor.selection.select(santrix.activeEditor.dom.select('p')[0]);
 */

/**
 * Formatter instance.
 *
 * @property formatter
 * @type santrix.Formatter
 */

/**
 * Undo manager instance, responsible for handling undo levels.
 *
 * @property undoManager
 * @type santrix.UndoManager
 * @example
 * // Undoes the last modification to the editor
 * santrix.activeEditor.undoManager.undo();
 */

/**
 * Is set to true after the editor instance has been initialized
 *
 * @property initialized
 * @type Boolean
 * @example
 * const isEditorInitialized = (editor) => {
 *   return editor && editor.initialized;
 * }
 */

/**
 * Window manager reference, use this to open new windows and dialogs.
 *
 * @property windowManager
 * @type santrix.WindowManager
 * @example
 * // Shows an alert message
 * santrix.activeEditor.windowManager.alert('Hello world!');
 *
 * // Opens a new dialog with the file.htm file and the size 320x240
 * santrix.activeEditor.windowManager.openUrl({
 *   title: 'Custom Dialog',
 *   url: 'file.htm',
 *   width: 320,
 *   height: 240
 * });
 */

/**
 * Notification manager reference, use this to open new windows and dialogs.
 *
 * @property notificationManager
 * @type santrix.NotificationManager
 * @example
 * // Shows a notification info message.
 * santrix.activeEditor.notificationManager.open({
 *   text: 'Hello world!',
 *   type: 'info'
 * });
 */

/**
 * Reference to the theme instance that was used to generate the UI.
 *
 * @property theme
 * @type santrix.Theme
 * @example
 * // Executes a method on the theme directly
 * santrix.activeEditor.theme.someMethod();
 */
