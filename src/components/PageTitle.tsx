function PageTitle({ heading = 'header' }: { heading: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-6 mt-6">
      <h2 className="text-2xl font-semibold capitalize text-white drop-shadow-lg mt-3">
        {heading}
      </h2>
    </div>
  );
}

export default PageTitle;
