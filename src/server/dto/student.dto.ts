class Assignment {
  readonly id: number;
  readonly status: number;
  readonly proof: string;
}

export class StudentDto {
  readonly id: number;
  readonly name: string;
  readonly is_muslim: boolean;
  readonly assignment: Assignment[];
}
