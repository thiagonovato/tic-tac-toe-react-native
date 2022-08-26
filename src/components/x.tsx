import { Text, View } from 'react-native';

const Xcomponent = () => {
  return (
    <View className='justify-center items-center'>
      <View className='w-16 h-2 rounded-xl bg-black absolute rotate-45' />
      <View className='w-16 h-2 rounded-xl bg-black absolute -rotate-45' />
    </View>
  );
};

export default Xcomponent;
