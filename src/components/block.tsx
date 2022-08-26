import { ReactElement } from 'react';
import { Text, View } from 'react-native';

interface IProps {
  children: ReactElement;
  position: {
    lin: number;
    col: number;
  };
}
const Block = ({ position, children }: IProps) => {
  let lin;
  let col;

  switch (position.col) {
    case 0:
      col = 'border-r-4';
      lin = position.lin === 1 && 'border-t-4 border-b-4';
      break;
    case 1:
      lin = position.lin === 1 && 'border-t-4 border-b-4';
      break;
    case 2:
      col = 'border-l-4 ';
      lin = position.lin === 1 && 'border-t-4 border-b-4';
      break;
  }
  return (
    <View>
      <View
        className={`w-24 h-24 bg-white border-black ${lin} ${col} justify-center`}
      >
        {children}
      </View>
    </View>
  );
};

export default Block;
