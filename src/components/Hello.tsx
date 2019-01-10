import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number; // Optional property
}

class Hello extends React.Component<Props, object> {
  render() {
    const {name, enthusiasmLevel = 1} = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className='Hello'>
          <div className='greeting'>
            Hello {name + getExclamationMarks(enthusiasmLevel)}
          </div>
        </div>
    );
  }
}

// function Hello({ name, enthusiasmLevel = 1 }: Props) {
//     if (enthusiasmLevel <= 0) {
//         throw new Error('You could be a little more enthusiastic. :D');
//     }
//
//     return (
//         <div className='Hello'>
//             <div className='greeting'>
//                 Hello {name + getExclamationMarks(enthusiasmLevel)}
//             </div>
//         </div>
//     );
// }

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
