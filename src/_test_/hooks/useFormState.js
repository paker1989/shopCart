import { useEffect } from "react";

export function useFormState(initialState) {
  const [state, setState] = useReducer(stateReducer, initialState || {});

  const createPropsGetter = type => (name, ownValue) => {
    const hasOwnValue = !!ownValue;
    const hasValueInState = state[name] !== undefined;

    function setInitialValue() {
      let value = "";
      setState({ [name]: value });
    }

    useEffect(() => void function(){console.log('??')});
    
    const inputProps = {
      name, // 给 input 添加 type: text or password
      get value() {
        if (!hasValueInState) {
          setInitialValue(); // 给初始化值
        }
        return hasValueInState ? state[name] : ""; // 赋值
      },
      onChange(e) {
        let { value } = e.target;
        setState({ [name]: value }); // 修改对应 Key 的值
      }
    };

    return inputProps;
  };

  const inputPropsCreators = ["text", "password"].reduce(
    (methods, type) => ({ ...methods, [type]: createPropsGetter(type) }),
    {}
  );

  return [
    { values: state }, // formState
    inputPropsCreators
  ];
}
