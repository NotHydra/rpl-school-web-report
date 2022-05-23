const Home = ({ student_data, assignment_data }) => {
  const assignment_filter = student_data[0].assignment.map(
    (assignment_dict) => {
      return assignment_dict.id;
    },
  );

  const filtered_assignment = assignment_data.filter((assignment) => {
    if (assignment_filter.includes(assignment.id)) {
      return assignment;
    }
  });

  return (
    <div>
      <table border="1px">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>

            {filtered_assignment.map((assignment_dict) => {
              return (
                <th>
                  {assignment_dict.subject}
                  {assignment_dict.count}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {student_data.map((student) => {
            const student_assignment_status = student.assignment.map(
              (assignment_dict) => {
                return <td>{assignment_dict.status}</td>;
              },
            );

            return (
              <tr>
                <td>{student.id}</td>
                <td>{student.name}</td>
                {student_assignment_status}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  let student_data = ctx.query.student_data;
  let assignment_data = ctx.query.assignment_data;

  return { props: { student_data, assignment_data } };
};

export default Home;
