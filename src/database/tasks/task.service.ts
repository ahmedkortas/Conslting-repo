import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { EmployeeService } from '../employee/employee.service';
import mailer from '../nodmailer';
import { Task } from './task.entity';

export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private employee: EmployeeService,
    private client: ClientService,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findAllEmployeeTask(data) {
    let { email } = data;
    console.log(data);
    let Employee = await this.employee.findOneByEmail(email);
    console.log(Employee);
    let EmployeeName = Employee.name;
    return this.taskRepository.find();
  }

  async create(task: Task): Promise<Task> {
    const admin = await this.taskRepository.create(task);
    return this.taskRepository.save(admin);
  }

  async update(data: any) {
    console.log(data);
    let id = data.id;
    let task = await this.taskRepository.findOne(id);
    console.log(task);
    let EmployeeEntity = await this.employee.findOneByUsername(
      task.EmployeeName,
    );
    console.log(EmployeeEntity);
    let ClientEntity = await this.client.findOneByName(task.ClientName);
    console.log(ClientEntity);
    let RoomNumber = Math.floor(Math.random() * 10000001);
    console.log(RoomNumber);
    let msg = `
    hey Mr/Mrs ${ClientEntity.name},you task status was updated,
    for more informations please conntect to our messaging app on: https://irada-messaging.herokuapp.com/
    use this room number :${RoomNumber} to connect to the employee in charge of your file we thank you for 
    chossing us `;
    let employeeMsg = `
    to connect with the Client login to the chat app and join the room number :${RoomNumber}
    `;
    mailer(EmployeeEntity.email, employeeMsg, 'Task Update', '');
    mailer(ClientEntity.email, msg, 'Task Update', '');
    await this.taskRepository.update({ id }, data);
    console.log(data);
    return this.taskRepository.findOne(id);
  }
}
