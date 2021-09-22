import commaNumber from 'comma-number';

const plain = num => num;

export default json => (json ? plain : commaNumber);
