export interface Left<A> {
  value: A;
  tag: "left";
}

export interface Right<B> {
  value: B;
  tag: "right";
}

export type Either<A, B> = Left<A> | Right<B>;

export function isLeft<A>(val: Either<A, any>): val is Left<A> {
  if ((val as Left<A>).tag === "left") {
    return true;
  }
  return false;
}

export function isRight<B>(val: Either<any, B>): val is Right<B> {
  if ((val as Right<B>).tag === "right") {
    return true;
  }
  return false;
}

export function Left<A>(val: A): Left<A> {
  return { value: val, tag: "left" };
}

export function Right<B>(val: B): Right<B> {
  return { value: val, tag: "right" };
}

export type Predicate<N> = (val: N) => boolean;

export function predicateEither<A, B>(
  value: B,
  error: A,
  predicate: Predicate<B>
): Either<A, B> {
  if (!predicate(value)) {
    return Left(error);
  }
  return Right(value);
}

export function firstLeft<A, B>(
  val: B,
  predicatePairs: [Predicate<B>, A][]
): Either<A, B> {
  for (let i = 0; i < predicatePairs.length; i++) {
    const p = predicatePairs[i][0];
    const e = predicatePairs[i][1];
    if (!p(val)) {
      return Left(e);
    }
  }
  return Right(val);
}
