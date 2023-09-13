import {Dna} from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Dna
        visible={true}
        height="300"
        width="400"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}

export default Loader