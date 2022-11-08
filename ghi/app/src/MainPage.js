import image from "./img/img.jpg";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto" style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"contain", height:1000,width:1000}}>
          <p className="lead mb-4 position-absolute bottom-0 start-50 translate-middle-x fs-3">
            The premiere solution for automobile dealership
            management!
          </p>
     </div>
    </div>
  );
}

export default MainPage;
