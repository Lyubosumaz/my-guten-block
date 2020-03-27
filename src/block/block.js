/**
 * BLOCK: my-guten-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-my-guten-block', {
    title: __('Gutenberg Block - Notification'),
    icon: 'smiley',
    category: 'common',
    attributes: {
        message: { type: 'string' },
        type: { type: 'string' },
        typeHeader: { type: 'string' },
        size: { type: 'string' },
        style: { type: 'string' },
    },
    keywords: [
        __('Notifications — CGB Block'),
        __('CGB Example'),
        __('create-guten-block'),
    ],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
    edit: (props) => {

        function handleInputs(event) {
            props.setAttributes({ message: event.target.value });
        }

        function handleTypes(event) {
            switch (event.target.value) {
                case 'success':
                    props.setAttributes({ type: event.target.value });
                    props.setAttributes({ typeHeader: 'Successful' });
                    break;
                case 'error':
                    props.setAttributes({ type: event.target.value });
                    props.setAttributes({ typeHeader: 'Error!' });
                    break;
                case 'notice':
                    props.setAttributes({ type: event.target.value });
                    props.setAttributes({ typeHeader: 'Notice' });
                    break;
                case 'warning':
                    props.setAttributes({ type: event.target.value });
                    props.setAttributes({ typeHeader: 'Warning' });
                    break;
                default:
                    break;
            }
        }

        function handleSizes(event) {
            props.setAttributes({ size: event.target.value });
        }
        function handleStyles(event) {
            props.setAttributes({ style: event.target.value });
        }

        return (
            <section className="block">
                <header className="header">
                    <h2>Make your custom Notification</h2>
                </header>
                <div className="content">

                    <div className="content-message">
                        <label htmlFor="message">Write your notification message:</label>
                        <input type="text" id="message" placeholder="Type your message.." value={props.attributes.message} onChange={handleInputs} />
                    </div>

                    <div className="content-fields">
                        <div className="content-select-type">
                            <select type="text" value={props.attributes.type} onChange={handleTypes}>
                                <option value="">Select your type</option>
                                <option value="success">Success</option>
                                <option value="error">Error</option>
                                <option value="notice">Notice</option>
                                <option value="warning">Warning</option>
                            </select>
                        </div>

                        <div className="content-select-size">
                            <select type="text" value={props.attributes.size} onChange={handleSizes}>
                                <option value="">Select your size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div className="content-select-style">
                            <select type="text" value={props.attributes.style} onChange={handleStyles}>
                                <option value="">Select your style</option>
                                <option value="classic">Classic</option>
                                <option value="colorful">Colorful</option>
                            </select>
                        </div>
                    </div>

                </div>
            </section>
        );
    },

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
    save: (props) => {
        console.log(props)
        return (
            <section className={[
                "notification",
                props.attributes.type,
                props.attributes.size,
                props.attributes.style
            ].join(' ')}>
                <header class="card-header">
                    <h2>{props.attributes.typeHeader}</h2>
                </header>
                <div class="card-content">
                    <p>{props.attributes.message}</p>
                </div>
            </section>
        );
    },
});
