const range = (start = 0, end = 0, step = 1) => {
  if (!Number.isInteger(start)) {
    throw new TypeError("start should be an integer");
  }
  if (!Number.isInteger(end)) {
    throw new TypeError("end should be an integer");
  }
  if (!Number.isInteger(step)) {
    throw new TypeError("step should be an integer");
  }

  if (end < start) {
    throw new RangeError("end should be greater than start");
  }
  if (step < 1) {
    throw new RangeError("step should be a positive integer");
  }

  return Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => start + i * step
  );
};

type usePaginationProps = {
  curPage: number;
  numPages: number;
  numPagesAroundCurrent?: number;
};

type usePaginationType<T> = (arg: T) => {
  sequence: number[];
  nextdisable: boolean;
  prevDisable: boolean;
};

const usePagination: usePaginationType<usePaginationProps> = ({
  curPage,
  numPages,
  numPagesAroundCurrent = 2
}) => {
  const numListInSequence = numPagesAroundCurrent * 2 + 1;
  const reworkedCurPage = Math.min(curPage, numPages);

  const nextdisable = curPage === Math.max(curPage, numPages);
  const prevDisable = curPage <= 1;
  let sequence;
  if (numPages <= numListInSequence) {
    sequence = range(1, numPages);
  } else {
    if (reworkedCurPage < numListInSequence / 2 + 1) {
      sequence = range(1, numListInSequence);
    } else if (reworkedCurPage > numPages - numListInSequence / 2) {
      sequence = range(numPages - numListInSequence + 1, numPages);
    } else {
      sequence = range(
        reworkedCurPage - numPagesAroundCurrent,
        reworkedCurPage + numPagesAroundCurrent
      );
    }
  }

  return { sequence, nextdisable, prevDisable };
};

export { usePagination };
